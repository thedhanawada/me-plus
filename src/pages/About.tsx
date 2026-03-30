import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { education, experiences, publications, featuredProject, contributions, archivedProjects } from '../data';

type Section = 'education' | 'work' | 'publications' | 'projects' | 'contributions' | 'older';

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'education', label: 'Education' },
  { id: 'work', label: 'Work' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'older', label: 'Older Projects' },
];

const About = () => {
  const [activeSection, setActiveSection] = useState<Section>('education');

  const educationRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const olderRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<Section, React.RefObject<HTMLDivElement>> = {
    education: educationRef,
    work: workRef,
    publications: publicationsRef,
    projects: projectsRef,
    contributions: contributionsRef,
    older: olderRef,
  };

  const scrollToSection = (section: Section) => {
    const el = sectionRefs[section].current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    if (atBottom) {
      setActiveSection('older');
      return;
    }

    const reversed: Section[] = ['older', 'contributions', 'projects', 'publications', 'work', 'education'];
    for (const section of reversed) {
      const el = sectionRefs[section].current;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(prev => prev !== section ? section : prev);
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
              About
            </h1>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              I work at a non-profit that delivers employment and skills programs like Workforce Australia, SEE, and SEA across Australia. I design and build the platforms our teams use to run them. Data warehouses, ETL pipelines, reporting, CRM, custom internal tools.
            </p>

            {/* Section markers */}
            <nav className="hidden lg:block space-y-1" aria-label="Page sections">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-mono transition-colors duration-fast rounded ${
                    activeSection === id
                      ? 'text-text-primary bg-bg-secondary'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Right pane — scrollable content */}
        <div>
          {/* Education */}
          <section ref={educationRef as React.RefObject<HTMLDivElement>} className="scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            <div className="space-y-10">
              {education.map((edu) => (
                <motion.div
                  key={edu.university}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {edu.universityUrl ? (
                          <HoverLink href={edu.universityUrl} external ariaLabel={`Visit ${edu.university} website`}>
                            {edu.university}
                          </HoverLink>
                        ) : (
                          edu.university
                        )}
                      </h3>
                      <p className="text-text-secondary">{edu.degree} - {edu.program}</p>
                    </div>
                    <div className="text-sm text-text-tertiary space-y-1 md:text-right mt-2 md:mt-0">
                      <div className="flex items-center gap-1 md:justify-end">
                        <MapPin size={14} className="text-text-muted" aria-hidden="true" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1 md:justify-end">
                        <Calendar size={14} className="text-text-muted" aria-hidden="true" />
                        {edu.period}
                      </div>
                    </div>
                  </div>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Honours</h4>
                      <ul className="space-y-1 text-text-secondary">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Award size={16} className="text-text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {edu.courses.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span key={course} className="text-sm bg-bg-secondary px-3 py-1 rounded">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Work */}
          <section ref={workRef as React.RefObject<HTMLDivElement>} className="border-t border-border-primary mt-12 pt-12 scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Work</h2>
            <div className="space-y-0">
              {experiences.map((exp, index) => {
                const isCurrent = index === 0;
                return (
                  <motion.div
                    key={`${exp.title}-${exp.company}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className={`py-10 ${index < experiences.length - 1 ? 'border-b border-border-primary' : ''}`}
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mb-2 font-mono">
                        <Calendar size={12} aria-hidden="true" />
                        <span>{exp.period}</span>
                        <span>·</span>
                        <MapPin size={12} aria-hidden="true" />
                        <span>{exp.location}</span>
                        {exp.award && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Award size={12} aria-hidden="true" />
                              {exp.award}
                            </span>
                          </>
                        )}
                        {isCurrent && (
                          <>
                            <span>·</span>
                            <span className="text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded">current</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-text-secondary">
                        {exp.companyUrl ? (
                          <HoverLink href={exp.companyUrl} external ariaLabel={`Visit ${exp.company} website`}>
                            {exp.company}
                          </HoverLink>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>

                    <div className="border-l-2 border-border-secondary pl-6 space-y-6">
                      {exp.highlights.map((highlight, hIdx) => (
                        <motion.div
                          key={highlight.title}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: hIdx * 0.05 }}
                          className="space-y-1.5"
                        >
                          <h4 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
                            {highlight.title}
                          </h4>
                          <p className="text-text-secondary leading-relaxed">
                            {highlight.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Publications */}
          <section ref={publicationsRef as React.RefObject<HTMLDivElement>} className="border-t border-border-primary mt-12 pt-12 scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Publications</h2>
            <div className="space-y-6">
              {publications.map((pub) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-text-muted mt-1 shrink-0" aria-hidden="true" />
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {pub.title}
                      </h3>
                      <div className="text-sm text-text-secondary space-y-1">
                        <div className="flex flex-wrap gap-3 text-text-tertiary">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} aria-hidden="true" />
                            {pub.date}
                          </span>
                          <span>Article {pub.articleNo}</span>
                          <span>Pages {pub.pages}</span>
                        </div>
                        <p>{pub.authors.join(', ')}</p>
                        <p className="text-text-tertiary">{pub.conference}</p>
                      </div>
                      <div className="pt-1">
                        <HoverLink
                          href={pub.link}
                          external
                          className="px-4 py-2 text-sm"
                          ariaLabel={`View publication: ${pub.title}`}
                        >
                          [view paper →]
                        </HoverLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Project */}
          <section ref={projectsRef as React.RefObject<HTMLDivElement>} className="border-t border-border-primary mt-12 pt-12 scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Projects</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="border border-border-primary rounded-lg bg-bg-primary card-shadow overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{featuredProject.name}</h3>
                    <p className="text-text-secondary text-sm mt-1">{featuredProject.tagline}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <HoverLink href={featuredProject.links.github} external className="px-3 py-1.5 text-sm" ariaLabel="View on GitHub">
                      [github]
                    </HoverLink>
                    {featuredProject.links.npm && (
                      <HoverLink href={featuredProject.links.npm} external className="px-3 py-1.5 text-sm" ariaLabel="View on npm">
                        [npm]
                      </HoverLink>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                <div className="space-y-3 mb-6">
                  {featuredProject.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-border-primary last:border-b-0"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm text-text-primary">{pkg.name}</span>
                        <span className="text-xs text-text-muted font-mono">v{pkg.version}</span>
                      </div>
                      <span className="text-sm text-text-tertiary">{pkg.summary}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-sm bg-bg-secondary px-3 py-1 rounded transition-colors duration-fast hover:bg-bg-tertiary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contributions */}
          <section ref={contributionsRef as React.RefObject<HTMLDivElement>} className="border-t border-border-primary mt-12 pt-12 scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Contributions</h2>
            <div className="space-y-3">
              {contributions.map((c) => (
                <motion.div
                  key={c.url}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                >
                  <span className="font-mono text-sm text-text-tertiary shrink-0">
                    {c.org}/{c.repo}
                  </span>
                  <span className="text-text-secondary text-sm truncate flex-1">
                    {c.title}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-mono ${c.status === 'merged' ? 'text-text-tertiary' : 'text-text-muted'}`}>
                      {c.status}
                    </span>
                    <HoverLink href={c.url} external className="px-2 py-1 text-xs" ariaLabel={`View PR: ${c.title}`}>
                      [view →]
                    </HoverLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Older Projects */}
          <section ref={olderRef as React.RefObject<HTMLDivElement>} className="border-t border-border-primary mt-12 pt-12 scroll-mt-[120px]">
            <h2 className="text-2xl font-bold mb-8">Older Projects</h2>
            <div className="space-y-4">
              {archivedProjects.map((project) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 py-2 border-b border-border-primary last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-text-primary">{project.title}</span>
                      <span className="text-xs text-text-muted">
                        {project.type === 'library' ? 'Library' : project.type === 'theme' ? 'Theme' : 'Tool'}
                      </span>
                    </div>
                    <p className="text-sm text-text-tertiary mt-0.5">{project.description}</p>
                  </div>
                  <div className="shrink-0">
                    <HoverLink
                      href={project.links.github || project.links.live || project.links.npm || project.links.firefox || '#'}
                      external
                      className="px-2 py-1 text-xs"
                      ariaLabel={`View ${project.title}`}
                    >
                      [view →]
                    </HoverLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default About;
