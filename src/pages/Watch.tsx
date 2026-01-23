import { useState, useEffect } from 'react';
import { Film, Tv } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { WATCHLIST_MEDIA, WATCHLIST_SECTIONS } from '../data';
import {
  fetchMediaList,
  isApiKeyConfigured,
  TMDB_IMAGE_BASE,
  type Media
} from '../services';

interface MediaSection {
  title: string;
  items: Media[];
}

const Watchlist = () => {
  const [sections, setSections] = useState<MediaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryMap = new Map(WATCHLIST_MEDIA.map(m => [m.id, m.category]));

  const buildSections = (mediaItems: Media[]): MediaSection[] =>
    WATCHLIST_SECTIONS.map(section => ({
      title: section.title,
      items: mediaItems.filter(m => categoryMap.get(m.id) === section.key),
    }));

  const loadMedia = async (useCache = true) => {
    setLoading(true);
    setError(null);

    try {
      const mediaItems = await fetchMediaList(WATCHLIST_MEDIA, useCache);
      setSections(buildSections(mediaItems));
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to load watchlist. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  if (!isApiKeyConfigured()) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: TMDB API key is not configured.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
        <div className="text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => loadMedia(false)}
            className="px-4 py-2 text-sm font-mono bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            Watchlist
          </h1>
          <div className="space-y-4 text-xl text-gray-600 dark:text-gray-400">
            <p>Not everything I watch — just the ones that stuck.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Data from{' '}
              <HoverLink href="https://www.themoviedb.org/" external>
                [TMDB]
              </HoverLink>
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
