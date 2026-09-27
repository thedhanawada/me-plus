import PlainPage, { link, Ext, H2, SideH } from '../components/Plain';
import { education, experiences, publications, featuredProject, contributions, archivedProjects } from '../data';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'older', label: 'Older projects' },
] as const;

// "2022.02 - Present" → "Feb 2022 – present"
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = (ym: string) => {
  const [y, m] = ym.split('.');
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};
const period = (p: string) => {
  const [start, end] = p.split(/\s+-\s+/);
  return `${month(start)} – ${/present/i.test(end) ? 'present' : month(end)}`;
};

const Meta = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-text-muted">{children}</p>
);

const About = () => (
  <PlainPage
    sidebar={
      <>
        <SideH>On this page</SideH>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} className={link}>{s.label}</a></li>
          ))}
        </ul>

        <SideH>Elsewhere</SideH>
        <p>
          <a href="mailto:nirmal@dhanawada.org" className={link}>nirmal@dhanawada.org</a>
          <br />
          <Ext href="https://github.com/thedhanawada">github.com/thedhanawada</Ext>
        </p>
      </>
    }
  >
    <h1 className="text-2xl font-bold text-text-primary mb-6">About</h1>
    <p>
      I work at a non-profit that delivers employment and skills programs like Workforce
      Australia, SEE and SEA across Australia. I design and build the platforms our teams
      use to run them: data warehouses, ETL pipelines, reporting, CRM, custom internal tools.
    </p>

    <H2 id="work">Work</H2>
    {experiences.map((exp) => (
      <section key={`${exp.title}-${exp.company}`} className="mb-10">
        <h3 className="text-text-primary">
          <span className="font-bold">{exp.title}</span>,{' '}
          {exp.companyUrl ? <Ext href={exp.companyUrl}>{exp.company}</Ext> : exp.company}
        </h3>
        <Meta>
          {exp.location} · {period(exp.period)}
          {exp.award && <> · {exp.award}</>}
        </Meta>
        {exp.highlights.map((h) => (
          <p key={h.title} className="mt-3">
            <span className="text-text-primary">{h.title}.</span> {h.description}
          </p>
        ))}
      </section>
    ))}

    <H2 id="education">Education</H2>
    {education.map((edu) => (
      <section key={edu.university} className="mb-8">
        <h3 className="text-text-primary">
          <span className="font-bold">{edu.degree}, {edu.program}</span>
          <br />
          {edu.universityUrl ? <Ext href={edu.universityUrl}>{edu.university}</Ext> : edu.university}
        </h3>
        <Meta>{edu.location} · {edu.period.replace(' - ', '–')}</Meta>
        {edu.achievements && edu.achievements.length > 0 && (
          <ul className="mt-3 list-disc pl-6 marker:text-text-muted">
            {edu.achievements.map((a) => <li key={a}>{a}</li>)}
          </ul>
        )}
        {edu.courses.length > 0 && (
          <p className="mt-3">Courses: {edu.courses.join(', ')}.</p>
        )}
      </section>
    ))}

    <H2 id="publications">Publications</H2>
    {publications.map((pub) => (
      <section key={pub.title} className="mb-8">
        <h3><Ext href={pub.link}>{pub.title}</Ext></h3>
        <p className="mt-1">{pub.authors.join(', ')}.</p>
        <Meta>
          {pub.conference}. {pub.date}, article {pub.articleNo}, pp. {pub.pages}.
        </Meta>
      </section>
    ))}

    <H2 id="projects">Projects</H2>
    <h3 className="text-text-primary">
      <span className="font-bold">{featuredProject.name}</span>: {featuredProject.tagline}
    </h3>
    <p className="mt-3">{featuredProject.description}</p>
    <ul className="mt-3 space-y-1">
      {featuredProject.packages.map((pkg) => (
        <li key={pkg.name}>
          <Ext href={`https://www.npmjs.com/package/${pkg.name}`}>{pkg.name}</Ext>{' '}
          <span className="text-text-muted">{pkg.version}</span>
          <span className="block text-sm text-text-muted">{pkg.summary}</span>
        </li>
      ))}
    </ul>
    <p className="mt-3">
      Built with {featuredProject.tech.join(', ')}.{' '}
      <Ext href={featuredProject.links.github}>GitHub</Ext>
      {featuredProject.links.npm && <>, <Ext href={featuredProject.links.npm}>npm</Ext></>}.
    </p>

    <H2 id="contributions">Contributions</H2>
    <ul className="space-y-2">
      {contributions.map((c) => (
        <li key={c.url}>
          <Ext href={c.url}>{c.title}</Ext>
          <span className="block text-sm text-text-muted">{c.org}/{c.repo}, {c.status}</span>
        </li>
      ))}
    </ul>

    <H2 id="older">Older projects</H2>
    <ul className="space-y-3">
      {archivedProjects.map((p) => (
        <li key={p.title}>
          <span className="text-text-primary">{p.title}</span>{' '}
          <span className="text-sm text-text-muted">({p.type})</span>. {p.description}
          <span className="block text-sm">
            {[
              p.links.live && <Ext key="live" href={p.links.live}>live</Ext>,
              p.links.github && <Ext key="gh" href={p.links.github}>github</Ext>,
              p.links.npm && <Ext key="npm" href={p.links.npm}>npm</Ext>,
              p.links.firefox && <Ext key="ff" href={p.links.firefox}>firefox</Ext>,
            ].filter(Boolean).map((el, i) => <span key={i}>{i > 0 && ' · '}{el}</span>)}
          </span>
        </li>
      ))}
    </ul>
  </PlainPage>
);

export default About;
