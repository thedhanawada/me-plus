import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const technologies = [
    { name: 'React', url: 'https://reactjs.org' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
    { name: 'Vite', url: 'https://vitejs.dev' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'Framer Motion', url: 'https://www.framer.com/motion' },
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

  return (
    <footer className="relative mt-auto backdrop-blur-sm">
      {/* Animated Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-pulse" />

      <div className="relative py-12 px-6">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-black to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="max-w-7xl mx-auto relative">
          {/* Name Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative group"
          >
            {/* Background glow effect */}
            <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Full Name */}
            <motion.h2 
              className="text-4xl md:text-5xl font-light mb-4 relative"
              initial={{ letterSpacing: "0.1em" }}
              whileHover={{ letterSpacing: "0.15em" }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative">
                <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-md" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 animate-text-shine">
                  Nirmala Rao Dhanawada
                </span>
              </span>
            </motion.h2>

            {/* Stylized Initials */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center space-x-1"
            >
              <div className="flex items-center">
                <motion.span 
                  className="text-lg text-cyan-400 font-medium"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  N
                </motion.span>
                <span className="text-zinc-500 mx-0.5">.</span>
                <motion.span 
                  className="text-lg text-fuchsia-400 font-medium"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  R
                </motion.span>
                <span className="text-zinc-500 mx-0.5">.</span>
              </div>
              <motion.span 
                className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                whileHover={{ letterSpacing: "0.1em" }}
                transition={{ duration: 0.3 }}
              >
                Dhanawada
              </motion.span>
            </motion.div>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
