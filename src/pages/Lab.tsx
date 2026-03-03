import { motion } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import { StaggeredList } from '../components/StaggeredList';
import { featuredProject, contributions, archivedProjects } from '../data';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Lab = () => {
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
            Lab
          </h1>
          <div className="space-y-4 text-xl text-text-secondary">
            <p>Things I build and contribute to outside of work.</p>
            <p>Everything here is open source.</p>
          </div>
        </motion.section>

        {/* Featured Project */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <div className="border border-border-primary rounded-lg bg-bg-primary card-shadow overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{featuredProject.name}</h2>
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

              {/* Packages */}
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
          </div>
        </motion.section>

        {/* Contributions */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <h2 className="text-2xl font-bold mb-content">Contributions</h2>
          <StaggeredList className="space-y-3" staggerDelay={0.1}>
            {contributions.map((c) => (
              <div
                key={c.url}
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
              </div>
            ))}
          </StaggeredList>
        </motion.section>

        {/* Archived Projects */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <h2 className="text-2xl font-bold mb-content">Older Projects</h2>
          <StaggeredList className="space-y-4" staggerDelay={0.1}>
            {archivedProjects.map((project) => (
              <div
                key={project.title}
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
              </div>
            ))}
          </StaggeredList>
        </motion.section>
      </div>
    </main>
  );
};

export default Lab;
