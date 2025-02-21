import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    { id: 156902, type: 'tv' },  // FROM
    { id: 125988, type: 'tv' },  // Silo

    // All-time Favorites
    { id: 120, type: 'movie' }, // LOTR: Fellowship
    { id: 121, type: 'movie' }, // LOTR: Two Towers
    { id: 122, type: 'movie' }, // LOTR: Return of the King
    { id: 62560, type: 'tv' },  // Mr. Robot
    { id: 4607, type: 'tv' },   // Lost
    { id: 1668, type: 'tv' },   // Friends
    { id: 1100, type: 'tv' },   // HIMYM
    { id: 1421, type: 'tv' },   // Modern Family
    { id: 61037, type: 'tv' },  // Superstore
    { id: 60797, type: 'tv' },  // Mom
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
            items: validFavorites.filter(m => m.id === 95396 || m.id === 156902 || m.id === 125988),
          },
          {
            title: "All Time Favorites",
            items: validFavorites.filter(m => m.id !== 95396 && m.id !== 156902 && m.id !== 125988),
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
      {/* Background effects from App.tsx */}
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500"
          >
            Watchlist
          </motion.h1>

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
                  <h2 className="text-2xl font-light text-white">{section.title}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {section.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="group relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                        <div className="relative bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-cyan-500/20 group-hover:border-fuchsia-500/50 transition-colors">
                          {item.poster_path && (
                            <div className="aspect-[2/3] overflow-hidden">
                              <img
                                src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-medium text-white leading-tight">{item.title}</h3>
                              <span className="text-[10px] text-zinc-500 uppercase shrink-0">{item.media_type}</span>
                            </div>
                            {item.release_date && (
                              <p className="text-xs text-zinc-400 mt-1">{item.release_date.split('-')[0]}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
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
