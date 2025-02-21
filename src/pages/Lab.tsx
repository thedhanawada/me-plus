import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Package, Palette } from 'lucide-react';

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
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              The Lab
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            A collection of hobby projects and experiments. Everything here is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-medium">
              open source
            </span>{' '}
            and built with ❤️ in my spare time.
          </p>
        </motion.div>

        {/* Open Source Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/20">
            <h2 className="text-2xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Why Open Source?
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              These projects are more than just code, they're a commitment to the open-source community. 
              Each one is freely available, open for collaboration, and built with the belief that 
              technology should be accessible to everyone. Feel free to use, modify or contribute!
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-full bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                      {project.title}
                    </h3>
                    <span className="inline-block mt-2 text-sm text-zinc-500">
                      Hobby Project • Open Source
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-cyan-400 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.npm && (
                      <a
                        href={project.links.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-cyan-400 transition-colors"
                        title="NPM Package"
                      >
                        <Package size={20} />
                      </a>
                    )}
                    {project.links.firefox && (
                      <a
                        href={project.links.firefox}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-cyan-400 transition-colors"
                        title="Firefox Add-on"
                      >
                        <Palette size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                    {project.status === 'active' ? '🔥 Active Development' : '✨ Completed'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.type === 'library' ? '📚 Library' : project.type === 'theme' ? '🎨 Theme' : '🛠️ Tool'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lab;
