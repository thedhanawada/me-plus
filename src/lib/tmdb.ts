import type { MediaEntry } from '../data/watchlist';

// Fetched once, at build time. The key never reaches the browser, and
// the page ships as plain HTML. Ratings refresh on every deploy.
const API = 'https://api.themoviedb.org/3';
export const POSTER = 'https://image.tmdb.org/t/p/w92';

export interface Media {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  year: number | null;
  poster: string | null;
  rating: number | null;
}

const fetchOne = async (entry: MediaEntry, key: string): Promise<Media | null> => {
  try {
    const res = await fetch(`${API}/${entry.type}/${entry.id}?api_key=${key}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    const date: string | undefined = d.release_date || d.first_air_date;
    return {
      id: entry.id,
      type: entry.type,
      title: d.title || d.name || entry.title || 'Unknown',
      year: date ? Number(date.slice(0, 4)) : null,
      poster: d.poster_path ? `${POSTER}${d.poster_path}` : null,
      rating: typeof d.vote_average === 'number' && d.vote_average > 0 ? d.vote_average : null,
    };
  } catch (err) {
    console.warn(`[tmdb] ${entry.type} ${entry.id}: ${(err as Error).message}`);
    return null;
  }
};

/** Returns null when there's no API key, so the page can say so instead of failing the build. */
export const fetchWatchlist = async (entries: MediaEntry[]): Promise<Map<number, Media> | null> => {
  const key = import.meta.env.TMDB_API_KEY ?? process.env.TMDB_API_KEY;
  if (!key) {
    console.warn('[tmdb] TMDB_API_KEY is not set; the TV page will be built without TMDB data.');
    return null;
  }
  const results = await Promise.all(entries.map((e) => fetchOne(e, key)));
  return new Map(results.filter((m): m is Media => m !== null).map((m) => [m.id, m]));
};
