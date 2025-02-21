import { motion } from 'framer-motion';
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

  // Media IDs with their types
  const FAVORITE_MEDIA = [
    // Currently Watching
    { id: 95396, type: 'tv', category: 'current' },   // Severance

    // Waiting for Next Season
    { id: 125988, type: 'tv', category: 'waiting' },  // Silo
    { id: 124364, type: 'tv', category: 'waiting' },  // FROM

    // Dinner & Lunch Rewatch Shows
    { id: 1421, type: 'tv', category: 'rewatch' },   // Modern Family
    { id: 62649, type: 'tv', category: 'rewatch' },  // Superstore
    { id: 1418, type: 'tv', category: 'rewatch' },  // TBBT
    { id: 49011, type: 'tv', category: 'rewatch' },  // Mom

    // All-time Favorites
    { id: 120, type: 'movie', category: 'favorite' }, // LOTR: Fellowship
    { id: 121, type: 'movie', category: 'favorite' }, // LOTR: Two Towers
    { id: 122, type: 'movie', category: 'favorite' }, // LOTR: Return of the King
    { id: 62560, type: 'tv', category: 'favorite' },  // Mr. Robot
    { id: 4607, type: 'tv', category: 'favorite' },   // Lost
    { id: 1668, type: 'tv', category: 'favorite' },   // Friends
    { id: 1100, type: 'tv', category: 'favorite' },   // HIMYM
    { id: 672, type: 'movie', category: 'favorite' }, // Harry Potter Chamber of Secrets
    { id: 63675, type: 'movie', category: 'favorite' },
    { id: 26910, type: 'movie', category: 'favorite' },
    { id: 7508, type: 'movie', category: 'favorite' },
    { id: 268660, type: 'movie', category: 'favorite' },
  ];

  useEffect(() => {
    const fetchMedia = async () => {
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
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                Watchlist
              </h1>
              <p className="text-zinc-400 text-sm md:text-base">My curated collection of movies and TV shows</p>
            </motion.div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="h-4"
              />
              <span>Powered by TMDB API</span>
            </motion.a>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <div className="space-y-8">
                {sections.map((section) => (
                  <div key={section.title} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {section.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {section.items.map((item) => (
                        <motion.div
                          key={item.id}
                          onClick={() => window.open(`https://www.themoviedb.org/${item.media_type}/${item.id}`, '_blank')}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                          <div className="relative">
                            <img
                              src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                              alt={item.title}
                              className="w-full h-[300px] object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {new Date(item.release_date || '').getFullYear()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {item.vote_average.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {item.media_type === 'tv' ? (
                                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                                    <Tv className="w-4 h-4" />
                                    <span className="text-xs font-medium">TV Series</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                                    <Film className="w-4 h-4" />
                                    <span className="text-xs font-medium">Movie</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
