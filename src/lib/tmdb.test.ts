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

  it('reads film and TV metadata without changing IDs or order', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ title: 'Film', release_date: '2020-01-01', vote_average: 7.2, poster_path: '/film.jpg' })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ name: 'Series', first_air_date: '2022-01-01', vote_average: 8, poster_path: '/series.jpg' })));
    const result = await fetchWatchlist(entries);
    expect([...result.values()]).toEqual([
      { id: 1, type: 'movie', title: 'Film', year: 2020, rating: 7.2, poster: `${POSTER}/film.jpg` },
      { id: 2, type: 'tv', title: 'Series', year: 2022, rating: 8, poster: `${POSTER}/series.jpg` },
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
