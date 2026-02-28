import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { SkeletonText } from '../components/Skeleton';
import { posts } from '../data';

const markdownFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NotePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/notes', { replace: true });
      return;
    }

    const loadContent = async () => {
      const filePath = `/src/content/posts/${post.slug}.md`;
      const loader = markdownFiles[filePath];

      if (loader) {
        const raw = (await loader()) as string;
        setContent(raw);
      }

      setLoading(false);
    };

    loadContent();
  }, [post, navigate]);

  if (!post) return null;

  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Back link */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <HoverLink to="/notes" className="px-0 py-0 inline-flex items-center gap-1 text-sm">
            <ArrowLeft size={14} />
            [back to notes]
          </HoverLink>
        </motion.div>

        {/* Post Header */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-fluid-4xl font-bold mb-content leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-text-muted" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>

            <span className="flex items-center gap-2">
              <Tag size={14} className="text-text-muted" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-bg-secondary px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </motion.section>

        {/* Post Content */}
        <motion.section
          className="border-t border-border-primary pt-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <div className="space-y-6">
              <SkeletonText lines={4} />
              <SkeletonText lines={3} />
              <SkeletonText lines={5} />
            </div>
          ) : content ? (
            <article className="prose-note">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
          ) : (
            <p className="text-text-secondary">Content not found.</p>
          )}
        </motion.section>
      </div>
    </main>
  );
};

export default NotePost;
