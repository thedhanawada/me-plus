import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import EmptyState from '../components/EmptyState';
import { posts } from '../data';

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const Notes = () => {
  const [activePost, setActivePost] = useState(sortedPosts[0]?.slug || '');
  const postRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToPost = (slug: string) => {
    const el = postRefs.current[slug];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    if (atBottom && sortedPosts.length > 0) {
      setActivePost(sortedPosts[sortedPosts.length - 1].slug);
      return;
    }

    for (let i = sortedPosts.length - 1; i >= 0; i--) {
      const el = postRefs.current[sortedPosts[i].slug];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActivePost(prev => prev !== sortedPosts[i].slug ? sortedPosts[i].slug : prev);
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

  if (posts.length === 0) {
    return (
      <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
        <EmptyState
          title="No notes yet"
          description="Check back later for new writing."
        />
      </main>
    );
  }

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
              Notes
            </h1>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Thinking out loud about systems, code, and building things.
            </p>

            {/* Post markers */}
            <nav className="hidden lg:block space-y-1" aria-label="Posts">
              {sortedPosts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => scrollToPost(post.slug)}
                  className={`block w-full text-left px-3 py-2 text-sm font-mono transition-colors duration-fast rounded ${
                    activePost === post.slug
                      ? 'text-text-primary bg-bg-secondary'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {post.title}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Right pane — posts */}
        <div>
          {sortedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              ref={(el) => { postRefs.current[post.slug] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`scroll-mt-[120px] ${index > 0 ? 'border-t border-border-primary mt-10 pt-10' : ''}`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-text-muted" aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="text-xl font-semibold">
                  <HoverLink to={`/notes/${post.slug}`} className="px-0 py-0">
                    {post.title}
                  </HoverLink>
                </h2>

                <p className="text-text-secondary leading-relaxed">
                  {post.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-text-muted" aria-hidden="true" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-bg-secondary px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Notes;
