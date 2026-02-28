import { Calendar, Tag } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import EmptyState from '../components/EmptyState';
import { StaggeredList } from '../components/StaggeredList';
import { posts } from '../data';

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const Notes = () => {
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
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-fluid-4xl font-bold mb-content leading-tight">
            Notes
          </h1>
          <p className="text-xl text-text-secondary">
            Thinking out loud about systems, code, and building things.
          </p>
        </section>

        {/* Post List */}
        <section>
          <StaggeredList className="space-y-8" staggerDelay={0.15}>
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                className="border-t border-border-primary pt-content"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-text-muted" />
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
                    <Tag size={14} className="text-text-muted" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-bg-secondary px-3 py-1 rounded transition-colors duration-fast hover:bg-bg-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </StaggeredList>
        </section>
      </div>
    </main>
  );
};

export default Notes;
