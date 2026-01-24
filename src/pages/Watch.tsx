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
      <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: TMDB API key is not configured.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
        <div className="text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => loadMedia(false)}
            className="px-4 py-2 text-sm font-mono bg-bg-inverted text-text-inverted hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-content leading-tight">
            Watchlist
          </h1>
          <div className="space-y-4 text-xl text-text-secondary">
            <p>Not everything I watch — just the ones that stuck.</p>
            <p className="text-sm text-text-tertiary">
              Data from{' '}
              <HoverLink href="https://www.themoviedb.org/" external>
                [TMDB]
              </HoverLink>
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-text-primary"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-border-primary pt-content first:border-t-0 first:pt-0">
                <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-lg"
                    >
                      <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-bg-secondary">
                        <img
                          src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-fast"
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <h3 className="text-sm font-medium text-text-primary line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-text-tertiary">
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
