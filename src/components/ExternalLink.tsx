import { ReactNode, MouseEvent } from 'react';
import { useExternalLink } from '../hooks';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const ExternalLink = ({ href, children, className = '', ariaLabel }: ExternalLinkProps) => {
  const { showModal } = useExternalLink();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showModal(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
