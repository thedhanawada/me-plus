import { Link } from 'react-router-dom';
import PlainPage, { link, Ext, H2, SideH } from '../components/Plain';
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

const Home = () => (
  <PlainPage
    sidebar={
      <>
        <figure>
          <img
            src="https://res.cloudinary.com/dyntcx472/image/upload/q_auto,f_auto,w_800/art002e000192_yso465"
            alt="Earth photographed from the Orion spacecraft window during Artemis II, April 2026"
            width={800}
            height={533}
            className="w-full h-auto"
          />
          <figcaption className="mt-2 text-text-muted">
            <Ext href="https://www.nasa.gov/image-article/hello-world/">"Hello, World"</Ext>. Earth
            from Orion, Artemis II, April 2026. Photo: NASA/Reid Wiseman. Not mine, but it's
            the best picture of where everyone's code runs.
          </figcaption>
        </figure>

        <SideH>Watching</SideH>
        <ul>
          {watching.map((m) => <li key={m.id}>{m.title}</li>)}
        </ul>
        <p className="mt-1"><Link to="/tv" className={link}>the whole list</Link></p>

        <SideH>Photographs</SideH>
        <p>
          {photos.length} so far. <Link to="/art" className={link}>Have a look</Link>.
        </p>

        <SideH>Contact</SideH>
        <p>
          <a href="mailto:nirmal@dhanawada.org" className={link}>nirmal@dhanawada.org</a>
          <br />
          <Ext href="https://github.com/thedhanawada">github.com/thedhanawada</Ext>
        </p>
        <p className="mt-2 text-text-muted">
          Code is easier to talk about than ideas, so if you have some, send it.
        </p>
      </>
    }
  >
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
  </PlainPage>
);

export default Home;
