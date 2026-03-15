import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { education, experiences, publications } from '../data';

type Section = 'education' | 'work' | 'publications';

const About = () => {
  const [activeSection, setActiveSection] = useState<Section>('education');
  const educationRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<Section, React.RefObject<HTMLDivElement>> = {
    education: educationRef,
    work: workRef,
    publications: publicationsRef,
  };

  const scrollToSection = (section: Section) => {
    const el = sectionRefs[section].current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    const sections: Section[] = ['publications', 'work', 'education'];
    for (const section of sections) {
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
              {([
                { id: 'education' as Section, label: 'Education' },
                { id: 'work' as Section, label: 'Work' },
                { id: 'publications' as Section, label: 'Publications' },
              ]).map(({ id, label }) => (
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
        <div ref={rightPaneRef}>
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
                      <h3 className="text-xl font-semibold">{edu.university}</h3>
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
                    {/* Role header */}
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
                      <p className="text-text-secondary">{exp.company}</p>
                    </div>

                    {/* Highlights */}
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
        </div>
      </div>
    </main>
  );
};

export default About;
