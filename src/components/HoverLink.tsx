import { Link } from 'react-router-dom';

interface HoverLinkProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  active?: boolean;
}

const HoverLink = ({
  href,
  to,
  children,
  className = 'px-4 py-2',
  external = false,
  onClick,
  ariaLabel,
  title,
  active = false,
}: HoverLinkProps) => {
  const baseClasses = active
    ? `relative font-mono transition-all duration-300 text-white bg-black dark:text-black dark:bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`
    : `relative font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`;

  const innerContent = active ? (
    <span className="relative z-10">{children}</span>
  ) : (
    <>
      <span className="absolute inset-0 bg-black dark:bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100"></span>
      <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">
        {children}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses} aria-label={ariaLabel} title={title}>
        {innerContent}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={baseClasses} aria-label={ariaLabel} title={title}>
        {innerContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={baseClasses}
      aria-label={ariaLabel}
      title={title}
    >
      {innerContent}
    </a>
  );
};

export default HoverLink;
