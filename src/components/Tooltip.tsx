import { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowPositionClasses = {
    top: 'top-full left-1/2 -translate-x-1/2',
    bottom: 'bottom-full left-1/2 -translate-x-1/2',
    left: 'left-full top-1/2 -translate-y-1/2',
    right: 'right-full top-1/2 -translate-y-1/2',
  };

  const arrowBorderStyles: Record<string, React.CSSProperties> = {
    top: { borderTopColor: 'rgb(var(--color-bg-inverted))', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent' },
    bottom: { borderBottomColor: 'rgb(var(--color-bg-inverted))', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent' },
    left: { borderLeftColor: 'rgb(var(--color-bg-inverted))', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: 'transparent' },
    right: { borderRightColor: 'rgb(var(--color-bg-inverted))', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`
          absolute ${positionClasses[position]}
          px-2 py-1 text-xs font-mono whitespace-nowrap
          bg-bg-inverted text-text-inverted rounded
          transition-all duration-fast
          pointer-events-none z-50
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        role="tooltip"
      >
        {content}
        <div
          className={`
            absolute ${arrowPositionClasses[position]}
            border-4
          `}
          style={arrowBorderStyles[position]}
        />
      </div>
    </div>
  );
};

export default Tooltip;
