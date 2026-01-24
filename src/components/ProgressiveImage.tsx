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
    // Reset state when src changes
    setIsLoaded(false);
    setCurrentSrc(null);

    // Preload the image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
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
