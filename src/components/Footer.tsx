import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const technologies = [
    { name: 'React', url: 'https://reactjs.org', icon: '⚛️' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org', icon: '🔷' },
    { name: 'Vite', url: 'https://vitejs.dev', icon: '⚡' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com', icon: '🎨' },
    { name: 'Framer Motion', url: 'https://www.framer.com/motion', icon: '🔄' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub',
      icon: <Github size={18} />,
      url: 'https://github.com/thedhanawada',
      color: 'group-hover:text-white'
    },
    { 
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: 'https://linkedin.com/in/thedhanawada',
      color: 'group-hover:text-blue-400'
    },
    { 
      name: 'Email',
      icon: <Mail size={18} />,
      url: 'mailto:nirmal@dhanawada.org',
      color: 'group-hover:text-fuchsia-400'
    },
  ];

  const BackToTop = () => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <motion.button
        onClick={scrollToTop}
        className="absolute top-0 right-6 transform -translate-y-1/2 p-3 rounded-full bg-black/70 border border-cyan-500/30 hover:border-fuchsia-500/50 transition-colors group"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <ArrowUp size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
      </motion.button>
    );
  };

  return (
    <footer className="relative mt-auto backdrop-blur-sm">
      {/* Animated Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-pulse" />

      <div className="relative py-12 px-6">
        {/* Back to Top Button */}
        <BackToTop />
        
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-black to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="max-w-7xl mx-auto relative">
          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative group"
          >
            {/* Background glow effect */}
            <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.blockquote 
              className="relative max-w-3xl mx-auto px-8 py-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 text-6xl text-cyan-500/20">"</div>
              <div className="absolute bottom-0 right-0 text-6xl text-fuchsia-500/20">"</div>
              <p className="text-lg md:text-xl italic text-zinc-300 leading-relaxed">
                I do not love the bright sword for its sharpness, nor the arrow for its swiftness, nor the warrior for his glory. I love only that which they defend.
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  — Faramir
                </cite>
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-light">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  Built with
                </span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <motion.a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="relative px-4 py-2 bg-black/50 rounded-full border border-cyan-500/20 group-hover:border-fuchsia-500/50 transition-colors">
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors duration-300">
                        <span className="mr-2">{tech.icon}</span>
                        {tech.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-light">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                  Connect
                </span>
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative p-3 rounded-xl bg-black/50 border border-cyan-500/20 group-hover:border-fuchsia-500/50 transition-all duration-300">
                      <span className={`text-zinc-400 transition-colors duration-300 ${link.color}`}>
                        {link.icon}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Minimal Footer Info */}
          <div className="mt-16 pt-8 border-t border-zinc-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span>Nirmala Rao Dhanawada</span>
                <span className="mx-2">•</span>
                <span>Sydney</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 md:mt-0"
              >
                <span>{new Date().getFullYear()}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
