import HoverLink from './HoverLink';

const Footer = () => {
  return (
    <footer className="border-t border-border-primary mt-16 transition-colors duration-slow">
      <div className="max-w-container mx-auto px-page-x py-12 text-center">
        <div className="flex justify-center space-x-8 text-sm mb-4 mt-6">
          <HoverLink href="https://github.com/thedhanawada" external>
            [github]
          </HoverLink>
          <HoverLink href="mailto:nirmal@dhanawada.org">
            [email]
          </HoverLink>
        </div>
        <p className="text-xs text-text-muted">
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
