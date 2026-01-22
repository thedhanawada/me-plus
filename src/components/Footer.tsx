import HoverLink from './HoverLink';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-16 dark:border-gray-700 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="flex justify-center space-x-8 text-sm mb-4 mt-6">
          <HoverLink href="https://github.com/thedhanawada" external>
            [github]
          </HoverLink>
          <HoverLink href="mailto:nirmal@dhanawada.org">
            [email]
          </HoverLink>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Built with{' '}
          <HoverLink href="https://react.dev/" external className="px-1">
            React
          </HoverLink>
          ,{' '}
          <HoverLink href="https://www.typescriptlang.org/" external className="px-1">
            TypeScript
          </HoverLink>
          , and{' '}
          <HoverLink href="https://tailwindcss.com/" external className="px-1">
            Tailwind CSS
          </HoverLink>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
