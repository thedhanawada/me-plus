import { Link } from 'react-router-dom';
import PlainPage, { link } from '../components/Plain';
import { posts } from '../data';

const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

const Notes = () => (
  <PlainPage>
    <h1 className="text-2xl font-bold text-text-primary mb-6">Notes</h1>
    <p>Thinking out loud about systems, code, and building things.</p>

    {sortedPosts.length === 0 ? (
      <p className="mt-12 text-text-muted">Nothing here yet.</p>
    ) : (
      <ul className="mt-12 space-y-8">
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <p className="text-sm text-text-muted tabular-nums">{post.date}</p>
            <h2 className="mt-1">
              <Link to={`/notes/${post.slug}`} className={link}>{post.title}</Link>
            </h2>
            <p className="mt-1">{post.summary}</p>
            <p className="mt-1 text-sm text-text-muted">tags: {post.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    )}
  </PlainPage>
);

export default Notes;
