const TMDB_API_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const CACHE_KEY = 'watchlist_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
}

export interface MediaEntry {
  id: number;
  type: 'movie' | 'tv';
  category: 'current' | 'waiting' | 'rewatch' | 'favorite';
}

interface CacheData {
  data: Media[];
  timestamp: number;
}

const getApiKey = (): string | null => {
  return import.meta.env.VITE_TMDB_API_KEY || null;
};

export const isApiKeyConfigured = (): boolean => {
  return !!getApiKey();
};

const getCachedData = (): Media[] | null => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp }: CacheData = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch {
    // Cache read failed
  }
  return null;
};

const setCachedData = (data: Media[]): void => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // Cache write failed
  }
};

export const fetchMediaItem = async (id: number, type: 'movie' | 'tv'): Promise<Media | null> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('TMDB API key is not configured');
  }

  try {
    const response = await fetch(`${TMDB_API_BASE}/${type}/${id}?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} with ID ${id}`);
    }

    const data = await response.json();

    return {
      ...data,
      title: data.title || data.name,
      release_date: data.release_date || data.first_air_date,
      media_type: type
    };
  } catch (error) {
    console.error(`Error fetching ${type} ${id}:`, error);
    return null;
  }
};

export const fetchMediaList = async (
  entries: MediaEntry[],
  useCache = true
): Promise<Media[]> => {
  // Check cache first
  if (useCache) {
    const cached = getCachedData();
    if (cached) {
      return cached;
    }
  }

  const results = await Promise.all(
    entries.map(({ id, type }) => fetchMediaItem(id, type))
  );

  const validResults = results.filter((item): item is Media => item !== null);

  // Cache the results
  setCachedData(validResults);

  return validResults;
};

export const clearCache = (): void => {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore errors
  }
};
