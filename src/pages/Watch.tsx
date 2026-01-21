import { useState, useEffect } from 'react';
import { Film, Tv } from 'lucide-react';

interface Media {
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

interface MediaSection {
  title: string;
  items: Media[];
}

const Watchlist = () => {
  const [sections, setSections] = useState<MediaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  if (!TMDB_API_KEY) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-500">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: TMDB API key is not configured.</p>
        </div>
      </main>
    );
  }

  // Media IDs with their types
  const FAVORITE_MEDIA = [
    // Currently Watching
    { id: 70523, type: 'tv', category: 'current' },   // Dark (rewatching)
    { id: 72844, type: 'tv', category: 'current' },   // The Haunting of Hill House

    // Waiting for Next Season
    { id: 125988, type: 'tv', category: 'waiting' },  // Silo
    { id: 124364, type: 'tv', category: 'waiting' },  // FROM
    { id: 95396, type: 'tv', category: 'waiting' },   // Severance

    // Dinner & Lunch Rewatch Shows
    { id: 1421, type: 'tv', category: 'rewatch' },   // Modern Family
    { id: 62649, type: 'tv', category: 'rewatch' },  // Superstore
    { id: 1418, type: 'tv', category: 'rewatch' },  // TBBT
    { id: 49011, type: 'tv', category: 'rewatch' },  // Mom
    { id: 2691, type: 'tv', category: 'rewatch' },   // Two and a Half Men
    { id: 1668, type: 'tv', category: 'rewatch' },   // Friends

    // All-time Favorites
    { id: 120, type: 'movie', category: 'favorite' }, // LOTR: Fellowship
    { id: 121, type: 'movie', category: 'favorite' }, // LOTR: Two Towers
    { id: 122, type: 'movie', category: 'favorite' }, // LOTR: Return of the King
    { id: 62560, type: 'tv', category: 'favorite' },  // Mr. Robot
    { id: 4607, type: 'tv', category: 'favorite' },   // Lost
    { id: 1100, type: 'tv', category: 'favorite' },   // HIMYM
    { id: 672, type: 'movie', category: 'favorite' }, // Harry Potter Chamber of Secrets
    { id: 63675, type: 'movie', category: 'favorite' },
    { id: 26910, type: 'movie', category: 'favorite' },
    { id: 7508, type: 'movie', category: 'favorite' },
    { id: 268660, type: 'movie', category: 'favorite' },
    { id: 550, type: 'movie', category: 'favorite' },    // Fight Club
    { id: 62320, type: 'tv', category: 'favorite' },    // Grace and Frankie
    { id: 198277, type: 'movie', category: 'favorite' }, // Begin Again
  ];

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const favorites = await Promise.all(
        FAVORITE_MEDIA.map(async ({ id, type }) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`
            );
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
        })
      );

      const validFavorites = favorites.filter((item): item is Media => item !== null);

      setSections([
        {
          title: "Currently Watching",
          items: validFavorites.filter(m => FAVORITE_MEDIA.find(f => f.id === m.id)?.category === 'current'),
        },
        {
          title: "Dinner & Lunch Rewatch Shows",
          items: validFavorites.filter(m => FAVORITE_MEDIA.find(f => f.id === m.id)?.category === 'rewatch'),
        },
        {
          title: "Waiting for Next Season",
          items: validFavorites.filter(m => FAVORITE_MEDIA.find(f => f.id === m.id)?.category === 'waiting'),
        },
        {
          title: "All Time Favorites",
          items: validFavorites.filter(m => FAVORITE_MEDIA.find(f => f.id === m.id)?.category === 'favorite'),
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to load watchlist. Please check your connection and try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-500">
        <div className="text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchMedia}
            className="px-4 py-2 text-sm font-mono bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-500">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            Watchlist
          </h1>
          <div className="space-y-4 text-xl text-gray-600 dark:text-gray-400">
            <p>Movies and TV shows I watch and rewatch.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Data from{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                <span className="absolute inset-0 bg-black dark:bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">[TMDB]</span>
              </a>
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-gray-200 dark:border-gray-700 pt-8 first:border-t-0 first:pt-0">
                <h2 className="text-2xl font-bold mb-6 dark:text-gray-100">{section.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg"
                    >
                      <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <img
                          src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{new Date(item.release_date || '').getFullYear()}</span>
                          <div className="flex items-center gap-1">
                            {item.media_type === 'tv' ? <Tv className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                            <span>★ {item.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Watchlist;
