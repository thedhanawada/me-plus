import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Tv } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import ExternalLink from '../components/ExternalLink';
import { SkeletonCard } from '../components/Skeleton';
import ProgressiveImage from '../components/ProgressiveImage';
import EmptyState from '../components/EmptyState';
import { WATCHLIST_MEDIA, WATCHLIST_SECTIONS } from '../data';
import {
  fetchMediaList,
  isApiKeyConfigured,
  TMDB_IMAGE_BASE,
  type Media
} from '../services';

type SectionKey = typeof WATCHLIST_SECTIONS[number]['key'];

// Skeleton loader for watchlist sections
const WatchlistSkeleton = () => (
  <div className="space-y-12">
    {WATCHLIST_SECTIONS.map((section) => (
      <section key={section.key} className="border-t border-border-primary pt-content first:border-t-0 first:pt-0">
        <div className="h-8 w-48 bg-bg-tertiary rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    ))}
  </div>
);

interface MediaSection {
  key: SectionKey;
  title: string;
  items: Media[];
}

const Watchlist = () => {
  const [sections, setSections] = useState<MediaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>(WATCHLIST_SECTIONS[0].key);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categoryMap = useMemo(() => new Map(WATCHLIST_MEDIA.map(m => [m.id, m.category])), []);

  const buildSections = useCallback((mediaItems: Media[]): MediaSection[] =>
    WATCHLIST_SECTIONS.map(section => ({
      key: section.key,
      title: section.title,
      items: mediaItems.filter(m => categoryMap.get(m.id) === section.key),
    })), [categoryMap]);

  const loadMedia = useCallback(async (useCache = true) => {
    setLoading(true);
    setError(null);

    try {
      const mediaItems = await fetchMediaList(WATCHLIST_MEDIA, useCache);
      setSections(buildSections(mediaItems));
    } catch (err) {
      console.error('Error fetching media:', err);
      setSections([]);
      setError('Failed to load watchlist. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [buildSections]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const scrollToSection = (key: SectionKey) => {
    const el = sectionRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    if (atBottom) {
      const lastKey = WATCHLIST_SECTIONS[WATCHLIST_SECTIONS.length - 1].key;
      setActiveSection(prev => prev !== lastKey ? lastKey : prev);
      return;
    }

    for (let i = WATCHLIST_SECTIONS.length - 1; i >= 0; i--) {
      const el = sectionRefs.current[WATCHLIST_SECTIONS[i].key];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          const key = WATCHLIST_SECTIONS[i].key;
          setActiveSection(prev => prev !== key ? key : prev);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

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

  const visibleSections = sections.filter(s => s.items.length > 0);

  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
        {/* Left pane — sticky */}
        <div className="lg:sticky lg:top-[120px] lg:self-start mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-fluid-4xl font-bold mb-6 leading-tight">
              TV
            </h1>
            <p className="text-base text-text-secondary leading-relaxed mb-2">
              Not everything I watch — just the ones that stuck.
            </p>
            <p className="text-sm text-text-tertiary mb-8">
              Data from{' '}
              <HoverLink href="https://www.themoviedb.org/" external>
                [TMDB]
              </HoverLink>
            </p>

            {/* Section nav */}
            {!loading && visibleSections.length > 0 && (
              <nav className="hidden lg:block space-y-1" aria-label="Watchlist sections">
                {visibleSections.map(({ key, title, items }) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`block w-full text-left px-3 py-2 text-sm font-mono transition-colors duration-fast rounded ${
                      activeSection === key
                        ? 'text-text-primary bg-bg-secondary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {title}
                    <span className="ml-2 text-text-muted">({items.length})</span>
                  </button>
                ))}
              </nav>
            )}
          </motion.div>
        </div>

        {/* Right pane — content */}
        <div>
          {loading ? (
            <WatchlistSkeleton />
          ) : visibleSections.length === 0 ? (
            <EmptyState type="media" />
          ) : (
            visibleSections.map((section, index) => (
              <section
                key={section.key}
                ref={(el) => { sectionRefs.current[section.key] = el; }}
                className={`scroll-mt-[120px] ${index > 0 ? 'border-t border-border-primary mt-12 pt-12' : ''}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.03 }}
                      >
                        <ExternalLink
                          href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}
                          className="block group focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-lg"
                          ariaLabel={`View ${item.title || item.name || 'media'} on TMDB`}
                        >
                          <div className="aspect-[2/3] relative overflow-hidden rounded-lg card-shadow">
                            {item.poster_path ? (
                              <ProgressiveImage
                                src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                                alt={item.title || item.name || ''}
                                className="w-full h-full group-hover:scale-105 transition-transform duration-fast"
                              />
                            ) : (
                              <div className="w-full h-full bg-bg-secondary flex items-center justify-center">
                                {item.media_type === 'tv' ? (
                                  <Tv className="w-8 h-8 text-text-muted" aria-hidden="true" />
                                ) : (
                                  <Film className="w-8 h-8 text-text-muted" aria-hidden="true" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            <h3 className="text-sm font-medium text-text-primary line-clamp-2">
                              {item.title || item.name || 'Unknown'}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-text-tertiary">
                              <span>{item.release_date ? new Date(item.release_date).getFullYear() : ''}</span>
                              <div className="flex items-center gap-1">
                                {item.media_type === 'tv' ? <Tv className="w-3 h-3" aria-hidden="true" /> : <Film className="w-3 h-3" aria-hidden="true" />}
                                <span>★ {item.vote_average.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </ExternalLink>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Watchlist;
