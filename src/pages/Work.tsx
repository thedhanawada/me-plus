import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen, ChevronDown, Award } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { StaggeredList } from '../components/StaggeredList';
import { experiences, publications } from '../data';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="border border-border-primary rounded-lg overflow-hidden bg-bg-primary card-shadow">
      {/* Card header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-bg-secondary transition-colors duration-fast focus:outline-none focus-ring"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mb-1 font-mono">
            <Calendar size={12} />
            <span>{exp.period}</span>
            <span className="text-text-muted">·</span>
            <MapPin size={12} />
            <span>{exp.location}</span>
            {exp.award && (
              <>
                <span className="text-text-muted">·</span>
                <span className="flex items-center gap-1">
                  <Award size={12} />
                  {exp.award}
                </span>
              </>
            )}
            {index === 0 && (
              <>
                <span className="text-text-muted">·</span>
                <span className="text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded">current</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-semibold">{exp.title}</h3>
          <p className="text-text-secondary text-sm">{exp.company}</p>
        </div>

        <div className="flex items-center shrink-0">
          <ChevronDown
            size={16}
            className={`text-text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expandable details */}
      <motion.div
        initial={index === 0 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        animate={expanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-8 pt-6">
          <div className="border-l-2 border-border-secondary pl-6 space-y-6">
            {exp.highlights.map((highlight) => (
              <div key={highlight.title} className="space-y-1.5">
                <h4 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
                  {highlight.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Work = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-fluid-4xl font-bold mb-content leading-tight">
            Work
          </h1>
          <p className="text-xl text-text-secondary">
            The places I've worked and the problems I chose.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <StaggeredList className="space-y-4" staggerDelay={0.12}>
            {experiences.map((exp, index) => (
              <ExperienceCard key={`${exp.title}-${exp.company}`} exp={exp} index={index} />
            ))}
          </StaggeredList>
        </motion.section>

        {/* Publications */}
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
                  <BookOpen className="w-5 h-5 text-text-muted mt-1 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {pub.title}
                    </h3>

                    <div className="text-sm text-text-secondary space-y-1">
                      <div className="flex flex-wrap gap-3 text-text-tertiary">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
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
