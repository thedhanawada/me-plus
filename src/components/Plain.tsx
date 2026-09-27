import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks';

// Plain links, the way links used to look: underlined, blue, purple once visited.
export const link =
  'underline underline-offset-2 decoration-1 text-blue-700 visited:text-purple-700 dark:text-blue-400 dark:visited:text-purple-400 hover:decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring';

export const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>
);

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2 id={id} className="font-bold text-text-primary mt-12 mb-4 scroll-mt-8">{children}</h2>
);

export const SideH = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold text-text-primary mt-8 first:mt-0 mb-2">{children}</h2>
);

const NAV = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'notes', path: '/notes' },
  { name: 'photos', path: '/art' },
  { name: 'tv', path: '/tv' },
] as const;

interface PlainPageProps {
  children: ReactNode;
  /** Old-school right-hand column, separated by a rule. Stacks below on small screens. */
  sidebar?: ReactNode;
  /** Let the main column use the full page width (photos). */
  wide?: boolean;
}

/**
 * The one layout every page uses: a nav line, a 72-column text body with an
 * optional sidebar, and a footer.
 */
const PlainPage = ({ children, sidebar, wide = false }: PlainPageProps) => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const section = '/' + (pathname.split('/')[1] ?? '');

  return (
    <div className="font-mono text-[15px] leading-relaxed text-text-secondary">
      <div className="mx-auto max-w-[calc(72ch+22rem+6rem)] px-4 sm:px-8 py-10 sm:py-16">
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm mb-16" aria-label="Site">
          {NAV.map((item) =>
            item.path === section ? (
              <span key={item.path} aria-current="page" className="font-bold text-text-primary">{item.name}</span>
            ) : (
              <Link key={item.path} to={item.path} className={link}>{item.name}</Link>
            )
          )}
          <button
            onClick={toggleTheme}
            className="ml-auto text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {theme === 'dark' ? 'lights on' : 'lights off'}
          </button>
        </nav>

        {sidebar ? (
          <div className="lg:grid lg:grid-cols-[minmax(0,72ch)_22rem] lg:gap-x-12">
            <main id="main-content" className="min-w-0">{children}</main>
            <aside className="mt-16 lg:mt-0 pt-10 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border-primary lg:pl-12 text-sm">
              {sidebar}
            </aside>
          </div>
        ) : (
          <main id="main-content" className={wide ? '' : 'max-w-[72ch]'}>{children}</main>
        )}

        <footer className="mt-16 pt-6 border-t border-border-primary text-sm text-text-muted">
          Last built {__BUILD_DATE__}. This site is a React app, which is overkill for a few pages
          of text. I know. <Ext href="https://github.com/thedhanawada/me-plus">Source</Ext>.
        </footer>
      </div>
    </div>
  );
};

export default PlainPage;
