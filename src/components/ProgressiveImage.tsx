import { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  placeholderColor,
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(false);
    setCurrentSrc(null);

    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!cancelled) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setIsLoaded(false);
      }
    };

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      img.src = '';
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor || 'rgb(var(--color-bg-tertiary))',
      }}
    >
      {/* Placeholder shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer" />
      )}

      {/* Actual image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`
            w-full h-full object-cover
            transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
