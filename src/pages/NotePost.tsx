import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlainPage, { link } from '../components/Plain';
import { posts } from '../data';

const markdownFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

const NotePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/notes', { replace: true });
      return;
    }

    const title = `N.R Dhanawada - ${post.title}`;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', post.summary);
    setMeta('og:title', title);
    setMeta('og:description', post.summary);
    setMeta('og:url', `https://dhanawada.org/notes/${post.slug}`);
    setMeta('twitter:title', title);
    setMeta('twitter:description', post.summary);

    const loadContent = async () => {
      try {
        const filePath = `/src/content/posts/${post.slug}.md`;
        const loader = markdownFiles[filePath];

        if (!loader) {
          setError('Post not found');
          setContent(null);
        } else {
          const raw = (await loader()) as string;
          setContent(raw);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post. Please try again.');
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [post, navigate]);

  if (!post) return null;

  return (
    <PlainPage>
      <p className="text-sm mb-8">
        <Link to="/notes" className={link}>← all notes</Link>
      </p>

      <h1 className="text-2xl font-bold text-text-primary leading-snug">{post.title}</h1>
      <p className="mt-2 text-sm text-text-muted">
        {post.date} · {post.tags.join(', ')}
      </p>

      <div className="mt-10 pt-10 border-t border-border-primary">
        {loading ? (
          <p className="text-text-muted">Loading…</p>
        ) : error ? (
          <p>{error}</p>
        ) : content ? (
          <article className="prose-note">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </PlainPage>
  );
};

export default NotePost;
