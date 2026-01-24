import { ExternalLink, Github, Package, Palette } from 'lucide-react';
import HoverLink from '../components/HoverLink';
import Tooltip from '../components/Tooltip';
import { StaggeredList } from '../components/StaggeredList';
import { projects } from '../data';

const Lab = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-content leading-tight">
            Lab
          </h1>
          <div className="space-y-4 text-xl text-text-secondary">
            <p>Hobby projects and experiments.</p>
            <p>Everything here is open source.</p>
          </div>
        </section>

        {/* Projects */}
        <section>
          <StaggeredList className="space-y-8" staggerDelay={0.15}>
            {projects.map((project) => (
              <div
                key={project.title}
                className="p-6 rounded-lg border border-border-primary bg-bg-primary card-shadow card-interactive"
              >
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-text-tertiary text-sm mt-1">
                        Open Source • {project.type === 'library' ? 'Library' : project.type === 'theme' ? 'Theme' : 'Tool'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {project.links.live && (
                        <Tooltip content="Live Demo">
                          <HoverLink href={project.links.live} external className="p-2" ariaLabel="View live demo">
                            <ExternalLink size={20} />
                          </HoverLink>
                        </Tooltip>
                      )}
                      {project.links.github && (
                        <Tooltip content="GitHub">
                          <HoverLink href={project.links.github} external className="p-2" ariaLabel="View on GitHub">
                            <Github size={20} />
                          </HoverLink>
                        </Tooltip>
                      )}
                      {project.links.npm && (
                        <Tooltip content="NPM">
                          <HoverLink href={project.links.npm} external className="p-2" ariaLabel="View on NPM">
                            <Package size={20} />
                          </HoverLink>
                        </Tooltip>
                      )}
                      {project.links.firefox && (
                        <Tooltip content="Firefox Add-on">
                          <HoverLink href={project.links.firefox} external className="p-2" ariaLabel="View Firefox add-on">
                            <Palette size={20} />
                          </HoverLink>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm bg-bg-secondary px-3 py-1 rounded transition-colors duration-fast hover:bg-bg-tertiary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-text-tertiary">
                    Status: {project.status === 'active' ? 'Active Development' : 'Completed'}
                  </div>
                </div>
              </div>
            ))}
          </StaggeredList>
        </section>
      </div>
    </main>
  );
};

export default Lab;
