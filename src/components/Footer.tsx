import { motion } from 'framer-motion';

const Footer = () => {
  const technologies = [
    { name: 'React', url: 'https://reactjs.org' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
    { name: 'Vite', url: 'https://vitejs.dev' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'Framer Motion', url: 'https://www.framer.com/motion' },
    { name: 'TMDB API', url: 'https://www.themoviedb.org' },
  ];

  return (
    <footer className="relative mt-auto py-12 px-6 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-light text-zinc-400 mb-6"
          >
            Built with
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {technologies.map((tech, index) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-4 py-2"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <span className="relative text-sm text-zinc-400 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
