import { useState, useCallback } from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { photos, type Photo } from '../data';
import Skeleton from '../components/Skeleton';

const PhotoTile = ({
  photo,
  onClick
}: {
  photo: Photo;
  onClick: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-inset"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      aria-label="View photo"
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <CloudinaryImage
        cloudName={cloudName}
        publicId={photo.id}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        width="600"
        quality="auto"
        fetchFormat="auto"
        onLoad={() => setLoaded(true)}
      />
    </button>
  );
};

const Lightbox = ({
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  total
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/50 text-sm font-mono">
        {currentIndex + 1} / {total}
      </div>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight size={32} />
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <div
            className="bg-white/10 animate-pulse"
            style={{
              width: Math.min(photo.width, window.innerWidth * 0.9),
              height: Math.min(photo.height, window.innerHeight * 0.9),
              aspectRatio: `${photo.width} / ${photo.height}`
            }}
          />
        )}
        <CloudinaryImage
          cloudName={cloudName}
          publicId={photo.id}
          alt=""
          className={`max-w-[90vw] max-h-[90vh] object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          width="1600"
          quality="auto"
          fetchFormat="auto"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

const Art = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev + 1) % photos.length : null);
  }, []);

  if (!cloudName) {
    return (
      <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: Cloudinary cloud name is not configured.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main id="main-content" className="transition-colors duration-slow">
        {/* Collage grid - edge to edge, no gaps */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-0">
          {photos.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid">
              <PhotoTile
                photo={photo}
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Lightbox
          photo={photos[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={selectedIndex}
          total={photos.length}
        />
      )}
    </>
  );
};

export default Art;
