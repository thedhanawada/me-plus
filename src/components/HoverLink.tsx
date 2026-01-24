import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useExternalLink } from '../hooks';

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
  const { showModal } = useExternalLink();

  // Check if this is a real external link (not mailto, tel, etc.)
  const isExternalUrl = external && href && href.startsWith('http');

  const handleExternalClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isExternalUrl) {
      e.preventDefault();
      showModal(href);
    }
  };
  const baseClasses = active
    ? `relative font-mono transition-all duration-default text-text-inverted bg-bg-inverted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary ${className}`
    : `relative font-mono transition-all duration-default group text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary ${className}`;

  const innerContent = active ? (
    <span className="relative z-10">{children}</span>
  ) : (
    <>
      <span className="absolute inset-0 bg-bg-inverted scale-x-0 origin-left transition-transform duration-default group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100"></span>
      <span className="relative z-10 group-hover:text-text-inverted">
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
      onClick={isExternalUrl ? handleExternalClick : undefined}
      target={external && !isExternalUrl ? '_blank' : undefined}
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
