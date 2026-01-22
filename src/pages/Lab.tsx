import { ExternalLink, Github, Package, Palette } from 'lucide-react';
import HoverLink from '../components/HoverLink';

interface Project {
  title: string;
  description: string;
  links: {
    live?: string;
    github?: string;
    npm?: string;
    firefox?: string;
  };
  tech: string[];
  status: 'active' | 'completed' | 'planned';
  type: 'library' | 'theme' | 'tool';
}

const projects: Project[] = [
  {
    title: 'StandUp+',
    description: 'An open-source tool for effortless tracking and real results. StandUp+ helps teams streamline their daily standups and track progress effectively.',
    links: {
      live: 'https://standupplus.dhanawada.org/',
      github: 'https://github.com/thedhanawada/standupplus'
    },
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'active',
    type: 'tool'
  },
  {
    title: 'SpinOnSubmitJS',
    description: 'A compact JavaScript library that enhances form submit buttons with a visual loading spinner, providing immediate and intuitive feedback to users upon submission.',
    links: {
      github: 'https://github.com/thedhanawada/SpinOnSubmitJS',
      npm: 'https://www.npmjs.com/package/spinonsubmitjs'
    },
    tech: ['JavaScript', 'CSS', 'DOM API'],
    status: 'active',
    type: 'library'
  },
  {
    title: 'LiveValidateJS',
    description: 'A lightweight JavaScript library that provides real-time form validation and input checking for HTML forms. Create custom validation rules for each input field and receive instant feedback as users type.',
    links: {
      github: 'https://github.com/thedhanawada/LiveValidateJS',
      npm: 'https://www.npmjs.com/package/livevalidatejs'
    },
    tech: ['JavaScript', 'Form Validation', 'DOM API'],
    status: 'active',
    type: 'library'
  },
  {
    title: 'Timeless Veil',
    description: 'A minimalist Firefox theme with an elegant color palette. Sometimes the simplest things catch on - this theme brings a touch of sophistication to your browsing experience.',
    links: {
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/timeless-veil/',
      github: 'https://github.com/thedhanawada/timeless-veil'
    },
    tech: ['Firefox Theme', 'Design', 'CSS'],
    status: 'completed',
    type: 'theme'
  }
];

const Lab = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            Lab
          </h1>
          <div className="space-y-4 text-xl text-gray-600 dark:text-gray-400">
            <p>Hobby projects and experiments.</p>
            <p>Everything here is open source.</p>
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.title} className="border-t border-gray-200 dark:border-gray-700 pt-8 first:border-t-0 first:pt-0">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-gray-100">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Open Source • {project.type === 'library' ? 'Library' : project.type === 'theme' ? 'Theme' : 'Tool'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {project.links.live && (
                        <HoverLink href={project.links.live} external className="p-2" title="Live Demo" ariaLabel="View live demo">
                          <ExternalLink size={20} />
                        </HoverLink>
                      )}
                      {project.links.github && (
                        <HoverLink href={project.links.github} external className="p-2" title="GitHub" ariaLabel="View on GitHub">
                          <Github size={20} />
                        </HoverLink>
                      )}
                      {project.links.npm && (
                        <HoverLink href={project.links.npm} external className="p-2" title="NPM" ariaLabel="View on NPM">
                          <Package size={20} />
                        </HoverLink>
                      )}
                      {project.links.firefox && (
                        <HoverLink href={project.links.firefox} external className="p-2" title="Firefox Add-on" ariaLabel="View Firefox add-on">
                          <Palette size={20} />
                        </HoverLink>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Status: {project.status === 'active' ? 'Active Development' : 'Completed'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Lab;
