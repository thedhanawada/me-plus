import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchWatchlist, POSTER } from './tmdb';
import { WATCHLIST_MEDIA, type MediaEntry } from '../data/watchlist';

const entries: MediaEntry[] = [
  { id: 1, type: 'movie', category: 'favorite', title: 'Local film' },
  { id: 2, type: 'tv', category: 'current', title: 'Local series' },
];
const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('TMDB_API_KEY', 'test-key');
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

describe('watchlist metadata', () => {
  it('preserves every curated title without an API key or network calls', async () => {
    vi.stubEnv('TMDB_API_KEY', '');
    const result = await fetchWatchlist(WATCHLIST_MEDIA);
    expect(result.size).toBe(WATCHLIST_MEDIA.length);
    for (const entry of WATCHLIST_MEDIA) {
      expect(entry.title.trim()).not.toBe('');
      expect(result.get(entry.id)).toEqual({ id: entry.id, type: entry.type, title: entry.title, year: null, rating: null, poster: null });
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // Field examples from https://developer.themoviedb.org/openapi/tmdb-api.json
  it('reads official TMDB film and TV field examples without changing IDs or order', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ title: 'Star Wars', release_date: '1977-05-25', vote_average: 8.2, poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ name: 'Game of Thrones', first_air_date: '2011-04-17', vote_average: 8.438, poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg' })));
    const result = await fetchWatchlist(entries);
    expect([...result.values()]).toEqual([
      { id: 1, type: 'movie', title: 'Star Wars', year: 1977, rating: 8.2, poster: `${POSTER}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg` },
      { id: 2, type: 'tv', title: 'Game of Thrones', year: 2011, rating: 8.438, poster: `${POSTER}/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg` },
    ]);
  });

  it('keeps individual failed entries and does not leak exception text', async () => {
    fetchMock.mockRejectedValueOnce(new Error('secret-key-in-url'))
      .mockResolvedValueOnce(new Response(JSON.stringify({ name: 'Series' })));
    const result = await fetchWatchlist(entries);
    expect(result.size).toBe(2);
    expect(result.get(1)?.title).toBe('Local film');
    expect(result.get(2)?.title).toBe('Series');
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain('secret-key-in-url');
  });

  it.each([
    () => new Response('error', { status: 429 }),
    () => new Response('not JSON'),
    () => new Response('null'),
    () => new Response('[]'),
  ])('falls back for HTTP failures and invalid payloads', async (response) => {
    fetchMock.mockResolvedValue(response());
    const result = await fetchWatchlist([entries[0]]);
    expect(result.get(1)).toMatchObject({ title: 'Local film', year: null, poster: null, rating: null });
  });

  it('rejects malformed metadata fields', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ title: {}, release_date: 'unknown', vote_average: 11, poster_path: 'https://other.test/image.jpg' })));
    expect((await fetchWatchlist([entries[0]])).get(1)).toMatchObject({ title: 'Local film', year: null, poster: null, rating: null });
  });

  it('aborts stalled requests and preserves their titles', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
    }));
    const result = fetchWatchlist(entries);
    await vi.advanceTimersByTimeAsync(3_000);
    expect((await result).size).toBe(entries.length);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('limits simultaneous requests and retains input order', async () => {
    vi.useFakeTimers();
    let active = 0;
    let maximum = 0;
    fetchMock.mockImplementation(async () => {
      maximum = Math.max(maximum, ++active);
      await new Promise(resolve => setTimeout(resolve, 10));
      active--;
      return new Response('{}');
    });
    const many = Array.from({ length: 11 }, (_, index) => ({ ...entries[0], id: index }));
    const result = fetchWatchlist(many);
    await vi.runAllTimersAsync();
    expect(maximum).toBe(4);
    expect([...(await result).keys()]).toEqual(many.map(entry => entry.id));
  });
});

describe('safe metadata diagnostics', () => {
  it.each([401, 403, 404, 429, 500, 503])('reports only the HTTP status for %s', async (status) => {
    fetchMock.mockResolvedValue(new Response('sensitive response body', { status, statusText: 'sensitive status text' }));
    await fetchWatchlist([entries[0]]);
    expect(console.warn).toHaveBeenCalledExactlyOnceWith(`[tmdb] movie 1: metadata unavailable (http-${status}); keeping the local title.`);
  });

  it.each([
    ['invalid-json', 'sensitive non-JSON response'],
    ['invalid-schema', 'null'],
    ['invalid-schema', '[]'],
    ['invalid-schema', '{"success":false,"status_message":"sensitive API message"}'],
  ])('reports %s without body contents', async (category, body) => {
    fetchMock.mockResolvedValue(new Response(body));
    await fetchWatchlist([entries[0]]);
    expect(console.warn).toHaveBeenCalledExactlyOnceWith(`[tmdb] movie 1: metadata unavailable (${category}); keeping the local title.`);
  });

  it('does not log network error messages, URLs, causes, or credentials', async () => {
    vi.stubEnv('TMDB_API_KEY', 'sentinel-secret');
    fetchMock.mockRejectedValue(new Error('https://api.themoviedb.org/3/movie/1?api_key=sentinel-secret', { cause: new Error('sentinel-secret') }));
    await fetchWatchlist([entries[0]]);
    expect(console.warn).toHaveBeenCalledExactlyOnceWith('[tmdb] movie 1: metadata unavailable (network); keeping the local title.');
  });

  it('labels request deadline expiry as timeout', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new Error('sensitive abort detail')), { once: true });
    }));
    const result = fetchWatchlist([entries[0]]);
    await vi.advanceTimersByTimeAsync(3_000);
    await result;
    expect(console.warn).toHaveBeenCalledExactlyOnceWith('[tmdb] movie 1: metadata unavailable (timeout); keeping the local title.');
  });

  it('accepts TMDB-style nested details and nullable optional metadata', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      id: 1, title: 'Begin Again', original_title: 'Begin Again', adult: false,
      release_date: '2013-09-07', poster_path: '/qx4CRgWy8RwUs6uWGbqV6jJQHqY.jpg', vote_average: 7.191,
      belongs_to_collection: null, genres: [{ id: 35, name: 'Comedy' }],
      production_companies: [{ id: 1, logo_path: null, name: 'Example' }],
    }))).mockResolvedValueOnce(new Response(JSON.stringify({
      id: 2, name: 'Series', original_name: 'Series', first_air_date: '', poster_path: null,
      vote_average: 0, next_episode_to_air: null, seasons: [],
    })));
    const result = await fetchWatchlist(entries);
    expect(result.get(1)).toMatchObject({ title: 'Begin Again', year: 2013, rating: 7.191, poster: `${POSTER}/qx4CRgWy8RwUs6uWGbqV6jJQHqY.jpg` });
    expect(result.get(2)).toMatchObject({ title: 'Series', year: null, rating: null, poster: null });
    expect(console.warn).not.toHaveBeenCalled();
  });
});
