import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { posts } from '../data';

interface Crumb {
  label: string;
  path: string;
}

const ROUTE_LABELS: Record<string, string> = {
  '/about': 'about',
  '/notes': 'notes',
  '/art': 'art',
  '/tv': 'tv',
};

const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();

  const crumbs: Crumb[] = [{ label: 'home', path: '/' }];

  if (location.pathname !== '/') {
    const basePath = '/' + location.pathname.split('/')[1];
    const label = ROUTE_LABELS[basePath];

    if (label) {
      crumbs.push({ label, path: basePath });
    }

    // Handle nested routes like /notes/:slug
    if (params.slug && basePath === '/notes') {
      const post = posts.find((p) => p.slug === params.slug);
      const shortTitle = post
        ? post.title.length > 30
          ? post.title.slice(0, 30) + '...'
          : post.title
        : params.slug;
      crumbs.push({ label: shortTitle, path: location.pathname });
    }
  }

  // Don't render on home page (only "home" crumb)
  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-container mx-auto px-page-x pt-6">
      <ol className="flex items-center gap-0 text-sm font-mono text-text-muted">
        <AnimatePresence initial={false}>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <motion.li
                key={crumb.path}
                className="flex items-center"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                {i > 0 && (
                  <span className="mx-1.5 text-text-muted select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-text-secondary" aria-current="page">
                    [{crumb.label}]
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-text-muted hover:text-text-primary transition-colors duration-fast"
                  >
                    [{crumb.label}]
                  </Link>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
