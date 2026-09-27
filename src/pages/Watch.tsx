import { useState, useEffect, useCallback, useMemo } from 'react';
import PlainPage, { link, Ext, H2, SideH } from '../components/Plain';
import { WATCHLIST_MEDIA, WATCHLIST_SECTIONS } from '../data';
import { fetchMediaList, type Media } from '../services';

type SectionKey = typeof WATCHLIST_SECTIONS[number]['key'];

interface MediaSection {
  key: SectionKey;
  title: string;
  items: Media[];
}

// Small posters: TMDB's w92 size is plenty for a list thumbnail
const POSTER = 'https://image.tmdb.org/t/p/w92';

const Watchlist = () => {
  const [sections, setSections] = useState<MediaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryMap = useMemo(() => new Map(WATCHLIST_MEDIA.map((m) => [m.id, m.category])), []);

  const loadMedia = useCallback(async (useCache = true) => {
    setLoading(true);
    setError(null);
    try {
      const mediaItems = await fetchMediaList(WATCHLIST_MEDIA, useCache);
      // fetchMediaList swallows per-item failures, so "nothing came back" means TMDB is unreachable
      if (mediaItems.length === 0 && WATCHLIST_MEDIA.length > 0) {
        throw new Error('No titles loaded');
      }
      setSections(
        WATCHLIST_SECTIONS.map((section) => ({
          key: section.key,
          title: section.title,
          items: mediaItems.filter((m) => categoryMap.get(m.id) === section.key),
        }))
      );
    } catch (err) {
      console.error('Error fetching media:', err);
      setSections([]);
      setError("Couldn't load the list from TMDB.");
    } finally {
      setLoading(false);
    }
  }, [categoryMap]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const visibleSections = sections.filter((s) => s.items.length > 0);

  return (
    <PlainPage
      sidebar={
        <>
          <SideH>Sections</SideH>
          <ul>
            {WATCHLIST_SECTIONS.map((s) => {
              const count = WATCHLIST_MEDIA.filter((m) => m.category === s.key).length;
              return (
                <li key={s.key}>
                  <a href={`#${s.key}`} className={link}>{s.title}</a>{' '}
                  <span className="text-text-muted">({count})</span>
                </li>
              );
            })}
          </ul>

          <SideH>Where this comes from</SideH>
          <p>
            Titles, posters, years and ratings from <Ext href="https://www.themoviedb.org/">TMDB</Ext>.
            The opinions are mine.
          </p>
        </>
      }
    >
      <h1 className="text-2xl font-bold text-text-primary mb-6">TV</h1>
      <p>What I'm watching, rewatching over dinner, and waiting on.</p>

      {loading ? (
        <p className="mt-12 text-text-muted">Loading from TMDB…</p>
      ) : error ? (
        <p className="mt-12">
          {error}{' '}
          <button onClick={() => loadMedia(false)} className={link}>Try again</button>.
        </p>
      ) : visibleSections.length === 0 ? (
        <p className="mt-12 text-text-muted">Nothing on the list right now.</p>
      ) : (
        visibleSections.map((section) => (
          <section key={section.key}>
            <H2 id={section.key}>{section.title}</H2>
            <ul className="space-y-3">
              {section.items.map((item) => {
                const title = item.title || item.name || 'Unknown';
                const year = item.release_date ? new Date(item.release_date).getFullYear() : null;
                return (
                  <li key={item.id} className="grid grid-cols-[2.5rem_1fr] gap-x-4 items-center">
                    {item.poster_path ? (
                      <img
                        src={`${POSTER}${item.poster_path}`}
                        alt=""
                        width={40}
                        height={60}
                        loading="lazy"
                        className="w-10 h-[60px] object-cover bg-bg-secondary"
                      />
                    ) : (
                      <span className="w-10 h-[60px] bg-bg-secondary" aria-hidden="true" />
                    )}
                    <span>
                      <Ext href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}>{title}</Ext>
                      <span className="block text-sm text-text-muted">
                        {[year, item.media_type === 'tv' ? 'series' : 'film', item.vote_average ? `${item.vote_average.toFixed(1)}/10` : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </PlainPage>
  );
};

export default Watchlist;
