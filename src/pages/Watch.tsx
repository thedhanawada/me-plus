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
    { id: 95396, type: 'tv' },   // Severance
    { id: 125988, type: 'tv' },  // Silo
    { id: 124364, type: 'tv' },  // FROM

    // All-time Favorites
    { id: 120, type: 'movie' }, // LOTR: Fellowship
    { id: 121, type: 'movie' }, // LOTR: Two Towers
    { id: 122, type: 'movie' }, // LOTR: Return of the King
    { id: 62560, type: 'tv' },  // Mr. Robot
    { id: 4607, type: 'tv' },   // Lost
    { id: 1668, type: 'tv' },   // Friends
    { id: 1100, type: 'tv' },   // HIMYM
    { id: 1421, type: 'tv' },   // Modern Family
    { id: 62649, type: 'tv' },  // Superstore
    { id: 49011, type: 'tv' },  // Mom
    { id: 672, type: 'movie' }, // Harry Potter Chamber of Secrets
    { id: 63675, type: 'movie' }, 
    { id: 26910, type: 'movie' }, 
    { id: 7508, type: 'movie' }, 
    { id: 268660, type: 'movie' }, 

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

        // Currently watching IDs
        const currentlyWatchingIds = [95396, 125988, 124364]; // Severance, Silo, FROM

        setSections([
          {
            title: "Currently Watching",
            items: validFavorites.filter(m => currentlyWatchingIds.includes(m.id)),
          },
          {
            title: "All Time Favorites",
            items: validFavorites.filter(m => !currentlyWatchingIds.includes(m.id)),
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

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="space-y-16">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-light text-white flex items-center space-x-3">
                    <span>{section.title}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {section.items.map((item) => (
                      <motion.a
                        key={item.id}
                        href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                        <div className="relative bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-cyan-500/20 group-hover:border-fuchsia-500/50 transition-colors">
                          {item.poster_path ? (
                            <div className="aspect-[2/3] overflow-hidden">
                              <img
                                src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[2/3] bg-zinc-900 flex items-center justify-center">
                              {item.media_type === 'movie' ? (
                                <Film className="w-12 h-12 text-zinc-700" />
                              ) : (
                                <Tv className="w-12 h-12 text-zinc-700" />
                              )}
                            </div>
                          )}
                          <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-medium text-white leading-tight group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </h3>
                              <span className="text-[10px] text-zinc-500 uppercase shrink-0 bg-zinc-900/50 px-1.5 py-0.5 rounded-full">
                                {item.media_type}
                              </span>
                            </div>
                            {item.release_date && (
                              <p className="text-xs text-zinc-400 mt-1">{item.release_date.split('-')[0]}</p>
                            )}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
