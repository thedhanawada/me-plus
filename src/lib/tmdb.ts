import type { MediaEntry } from '../data/watchlist';

// Build-time only: credentials and fetching never reach the browser.
const API = 'https://api.themoviedb.org/3';
const REQUEST_TIMEOUT_MS = 3_000;
const CONCURRENCY = 4;
export const POSTER = 'https://image.tmdb.org/t/p/w92';

export interface Media {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  year: number | null;
  poster: string | null;
  rating: number | null;
}

const fallback = (entry: MediaEntry): Media => ({
  id: entry.id,
  type: entry.type,
  title: entry.title,
  year: null,
  poster: null,
  rating: null,
});

const fetchOne = async (entry: MediaEntry, key: string): Promise<Media> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${API}/${entry.type}/${entry.id}?api_key=${encodeURIComponent(key)}`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error('TMDB request failed');
    const data: unknown = await res.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid TMDB response');
    const d = data as Record<string, unknown>;
    const title = entry.type === 'movie' ? d.title : d.name;
    const date = entry.type === 'movie' ? d.release_date : d.first_air_date;
    return {
      ...fallback(entry),
      title: typeof title === 'string' && title.trim() ? title : entry.title,
      year: typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) ? Number(date.slice(0, 4)) : null,
      poster: typeof d.poster_path === 'string' && /^\/[\w.-]+$/.test(d.poster_path) ? `${POSTER}${d.poster_path}` : null,
      rating: typeof d.vote_average === 'number' && Number.isFinite(d.vote_average) && d.vote_average > 0 && d.vote_average <= 10 ? d.vote_average : null,
    };
  } catch {
    // Do not log the exception: network errors can contain the credential-bearing URL.
    console.warn(`[tmdb] ${entry.type} ${entry.id}: metadata unavailable; keeping the local title.`);
    return fallback(entry);
  } finally {
    clearTimeout(timeout);
  }
};

/** Optional metadata must never remove the author's curated titles from the page. */
export const fetchWatchlist = async (entries: MediaEntry[]): Promise<Map<number, Media>> => {
  const key = import.meta.env.TMDB_API_KEY ?? process.env.TMDB_API_KEY;
  const results = entries.map(fallback);
  if (!key) {
    console.warn('[tmdb] TMDB_API_KEY is not set; using local watchlist titles.');
  } else {
    // Bound requests rather than sending the entire watchlist to TMDB at once.
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, entries.length) }, async () => {
      while (next < entries.length) {
        const index = next++;
        results[index] = await fetchOne(entries[index], key);
      }
    }));
  }
  return new Map(results.map((media) => [media.id, media]));
};
