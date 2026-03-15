import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { experiences, publications } from '../data';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TimelineBar = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <div className="sticky top-[var(--header-height,80px)] bg-bg-primary/90 backdrop-blur-sm py-4 border-b border-border-primary transition-colors duration-slow" style={{ zIndex: 10 }}>
      <div className="max-w-container mx-auto px-page-x">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {experiences.map((exp, i) => {
            const isActive = i === activeIndex;
            const isCurrent = i === 0;
            const year = exp.period.split('.')[0];

            return (
              <button
                key={`${exp.title}-${exp.company}`}
                onClick={() => onSelect(i)}
                className={`group flex items-center gap-3 shrink-0 transition-all duration-default ${
                  i < experiences.length - 1 ? 'flex-1' : ''
                }`}
                aria-label={`${exp.title} at ${exp.company}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Node */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-colors duration-default ${
                      isActive
                        ? 'bg-text-primary border-text-primary'
                        : 'bg-bg-primary border-border-secondary group-hover:border-text-muted'
                    }`}
                    animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span
                    className={`absolute top-5 whitespace-nowrap text-xs font-mono transition-colors duration-default ${
                      isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'
                    }`}
                  >
                    {year}{isCurrent ? '+' : ''}
                  </span>
                </div>

                {/* Connector line */}
                {i < experiences.length - 1 && (
                  <div className={`h-[2px] flex-1 min-w-[40px] transition-colors duration-default ${
                    i < activeIndex ? 'bg-text-primary' : 'bg-border-secondary'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RoleSection = ({
  exp,
  index,
}: {
  exp: typeof experiences[0];
  index: number;
}) => {
  const isCurrent = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="py-12 first:pt-16"
    >
      {/* Role header */}
      <div className="mb-8">
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
        <h2 className="text-2xl font-bold">{exp.title}</h2>
        <p className="text-text-secondary text-lg">{exp.company}</p>
      </div>

      {/* Highlights */}
      <div className="border-l-2 border-border-secondary pl-6 space-y-8">
        {exp.highlights.map((highlight, hIdx) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: hIdx * 0.05 }}
            className="space-y-1.5"
          >
            <h3 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
              {highlight.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {highlight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 200;

    for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
      const el = sectionRefs.current[i];
      if (el && el.offsetTop <= scrollY) {
        setActiveIndex((prev) => (prev !== i ? i : prev));
        break;
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

  const scrollToSection = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      const offset = 160; // account for sticky header + timeline
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content" className="transition-colors duration-slow">
      <div className="max-w-container mx-auto px-page-x pt-page-y pb-8">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-fluid-4xl font-bold leading-tight">
            Work
          </h1>
        </motion.section>
      </div>

      {/* Sticky horizontal timeline */}
      <TimelineBar activeIndex={activeIndex} onSelect={scrollToSection} />

      {/* Role sections */}
      <div className="max-w-container mx-auto px-page-x">
        {experiences.map((exp, index) => (
          <div
            key={`${exp.title}-${exp.company}`}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className={index < experiences.length - 1 ? 'border-b border-border-primary' : ''}
          >
            <RoleSection
              exp={exp}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Publications */}
      <div className="max-w-container mx-auto px-page-x pb-page-y">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <h2 className="text-2xl font-bold mb-content">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div key={pub.title} className="space-y-4">
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
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Work;
