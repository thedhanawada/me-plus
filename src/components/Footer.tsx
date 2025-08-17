import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-16 dark:border-gray-700 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="flex justify-center space-x-8 text-sm mb-4 mt-6">
          <a
            href="https://github.com/thedhanawada"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black"
          >
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">[github]</span>
          </a>
          <a
            href="mailto:nirmal@dhanawada.org"
            className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black"
          >
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">[email]</span>
          </a>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Built with{' '}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">React</span>
          </a>
          ,{' '}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">TypeScript</span>
          </a>
          , and{' '}
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">Tailwind CSS</span>
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;