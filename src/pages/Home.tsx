import { Link } from 'react-router-dom';
import { useTheme } from '../hooks';
import {
  experiences,
  education,
  featuredProject,
  contributions,
  archivedProjects,
  publications,
  photos,
  posts,
  WATCHLIST_MEDIA,
} from '../data';

// Plain links, the way links used to look: underlined, blue, purple once visited.
const link =
  'underline underline-offset-2 decoration-1 text-blue-700 visited:text-purple-700 dark:text-blue-400 dark:visited:text-purple-400 hover:decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring';

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>
);

// "2016.10 - 2020.02" → "2016–20", "2021.07 - 2021.10" → "2021"
const years = (period: string) => {
  const [start, end] = period.split(/\s+-\s+/);
  const from = start.slice(0, 4);
  if (/present/i.test(end)) return `${from}–`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}–${to.slice(2)}`;
};

const [mtc, wehi, vs, tcs] = experiences;
const [melbourne] = education;
const [paper] = publications;
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const watching = WATCHLIST_MEDIA.filter((m) => m.category === 'current' && m.title);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-text-primary mt-12 mb-4">{children}</h2>
);

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main id="main-content" className="font-mono text-[15px] leading-relaxed text-text-secondary">
      <div className="px-4 sm:px-8 md:px-16 py-10 sm:py-16">
        <div className="max-w-[72ch]">
          <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm mb-16">
            <Link to="/about" className={link}>about</Link>
            <Link to="/notes" className={link}>notes</Link>
            <Link to="/art" className={link}>photos</Link>
            <Link to="/tv" className={link}>tv</Link>
            <button
              onClick={toggleTheme}
              className="ml-auto text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {theme === 'dark' ? 'lights on' : 'lights off'}
            </button>
          </nav>

          <h1 className="text-2xl font-bold text-text-primary mb-6">N.R. Dhanawada</h1>

          <p>
            I'm a solutions architect at {mtc.company} in {mtc.location.split(',')[0]}. I design
            the Salesforce side of government employment programs (SEE, Workforce Australia,
            VET and the rest): the CRM architecture, the pipelines that load department data
            into it, and the Lightning components over 500 staff use all day.
          </p>
          <p className="mt-4">
            Mostly, I find why something is broken and fix it properly instead of patching
            the symptom. It's not glamorous. It's what keeps things working on Monday morning.
          </p>
          <p className="mt-4">
            Before this: a research placement at WEHI ({years(wehi.period)}), a master's at
            the {melbourne.university} ({melbourne.period.replace(/\s+-\s+\d\d(\d\d)$/, '–$1')}),
            {' '}{vs.company} in {vs.location.split(',')[0]} ({years(vs.period)}), and{' '}
            {tcs.company} in {tcs.location.split(',')[0]} ({years(tcs.period)}).{' '}
            <Link to="/about" className={link}>The long version.</Link>
          </p>

          <H2>Code</H2>
          <p>
            <Ext href={featuredProject.links.github}>{featuredProject.name}</Ext>: {featuredProject.tagline.charAt(0).toLowerCase() + featuredProject.tagline.slice(1)}
            {' '}Zero dependencies, because Salesforce's Locker Service breaks most of them.
          </p>
          <ul className="mt-3 space-y-0.5">
            {featuredProject.packages.map((pkg) => (
              <li key={pkg.name} className="grid grid-cols-[1fr_auto] sm:grid-cols-[28ch_1fr] gap-x-4">
                <Ext href={`https://www.npmjs.com/package/${pkg.name}`}>{pkg.name}</Ext>
                <span className="text-text-muted tabular-nums">{pkg.version}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6">Patches sent upstream:</p>
          <ul className="mt-3 space-y-2">
            {contributions.map((c) => (
              <li key={c.url}>
                <Ext href={c.url}>{c.title}</Ext>
                <span className="block text-sm text-text-muted">
                  {c.org}/{c.repo}, <span className={c.status === 'merged' ? 'text-text-secondary' : ''}>{c.status}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6">
            Older, smaller things:{' '}
            {archivedProjects.map((p, i) => (
              <span key={p.title}>
                <Ext href={p.links.github ?? p.links.live ?? p.links.firefox ?? '#'}>{p.title}</Ext>
                {i < archivedProjects.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>

          <H2>Writing</H2>
          <ul className="space-y-1">
            {sortedPosts.map((post) => (
              <li key={post.slug} className="grid grid-cols-[6.5rem_1fr] gap-x-4">
                <span className="text-text-muted tabular-nums">{post.date}</span>
                <Link to={`/notes/${post.slug}`} className={link}>{post.title}</Link>
              </li>
            ))}
          </ul>
          {paper && (
            <p className="mt-4">
              And one paper, from {paper.date.split(' ')[1]}:{' '}
              <Ext href={paper.link}>{paper.title}</Ext>. It was a survey. I was an undergraduate.
            </p>
          )}

          <H2>Other things</H2>
          <p>
            I take <Link to="/art" className={link}>photographs</Link> ({photos.length} so far) and
            keep an honest list of <Link to="/tv" className={link}>what I'm watching</Link>
            {watching.length > 0 && <> (currently {watching[0].title} and {watching.length - 1} others)</>}.
          </p>

          <H2>Contact</H2>
          <p>
            <a href="mailto:nirmal@dhanawada.org" className={link}>nirmal@dhanawada.org</a>, or{' '}
            <Ext href="https://github.com/thedhanawada">github.com/thedhanawada</Ext>. Code is
            easier to talk about than ideas, so if you have some, send it.
          </p>

          <footer className="mt-16 pt-6 border-t border-border-primary text-sm text-text-muted">
            Last built {__BUILD_DATE__}. This page is a React app, which is overkill for a page of
            text. I know. <Ext href="https://github.com/thedhanawada/me-plus">Source</Ext>.
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;
