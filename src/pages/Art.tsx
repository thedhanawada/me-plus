import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { photos, type Photo } from '../data';
import Skeleton from '../components/Skeleton';
import { CLOUDINARY_CLOUD_NAME } from '../env';

// ---------------------------------------------------------------------------
// PhotoTile — individual photo in the masonry grid
// ---------------------------------------------------------------------------
const PhotoTile = ({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const cloudName = CLOUDINARY_CLOUD_NAME;

  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-inset group"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      aria-label={`View photo: ${photo.alt}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full !rounded-none" />
      )}
      <CloudinaryImage
        cloudName={cloudName}
        publicId={photo.id}
        alt={photo.alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } group-hover:scale-[1.03] group-focus-visible:scale-[1.03]`}
        loading="lazy"
        width="600"
        quality="auto"
        fetchFormat="auto"
        onLoad={() => setLoaded(true)}
      />
      {/* Subtle hover vignette */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </motion.button>
  );
};

// ---------------------------------------------------------------------------
// Lightbox — full-screen photo viewer with animated transitions
// ---------------------------------------------------------------------------
const Lightbox = ({
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  total,
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}) => {
  const cloudName = CLOUDINARY_CLOUD_NAME;
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const preloadControllerRef = useRef<AbortController | null>(null);

  // Reset loaded state when photo changes
  useEffect(() => {
    setLoaded(false);
  }, [photo.id]);

  // Focus trap and restore
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    containerRef.current?.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  // Keyboard navigation + focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();

      if (e.key === 'Tab' && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Preload adjacent images
  useEffect(() => {
    // Cancel previous preload requests
    if (preloadControllerRef.current) {
      preloadControllerRef.current.abort();
    }

    const controller = new AbortController();
    preloadControllerRef.current = controller;

    const preload = (idx: number) => {
      if (controller.signal.aborted) return;

      const p = photos[idx];
      if (p && cloudName) {
        const img = new Image();
        img.src = `https://res.cloudinary.com/${cloudName}/image/upload/w_1600,q_auto,f_auto/${p.id}`;
      }
    };

    preload((currentIndex + 1) % total);
    preload((currentIndex - 1 + total) % total);

    return () => {
      controller.abort();
    };
  }, [currentIndex, total, cloudName]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 'var(--z-lightbox)' }}
      onClick={onClose}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${photo.alt}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-bg-inverted/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Close photo viewer"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/40 text-sm font-mono z-10">
        {currentIndex + 1} / {total}
      </div>

      {/* Alt text caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono z-10 max-w-[80vw] text-center">
        {photo.alt}
      </div>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white/30 hover:text-white transition-colors z-10"
        aria-label="Previous photo"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white/30 hover:text-white transition-colors z-10"
        aria-label="Next photo"
      >
        <ChevronRight size={28} />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center z-[5]"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <div
            className="bg-white/5 animate-pulse rounded"
            style={{
              width: Math.min(photo.width, 1600),
              maxWidth: '90vw',
              aspectRatio: `${photo.width} / ${photo.height}`,
              maxHeight: '85vh',
            }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CloudinaryImage
              cloudName={cloudName}
              publicId={photo.id}
              alt={photo.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              width="1600"
              quality="auto"
              fetchFormat="auto"
              onLoad={() => setLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Art — main page component
// ---------------------------------------------------------------------------
const Art = () => {
  const cloudName = CLOUDINARY_CLOUD_NAME;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const favorites = useMemo(() => photos.filter((p) => p.favorite), []);
  const collection = useMemo(() => photos.filter((p) => !p.favorite), []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, []);

  if (!cloudName) {
    return (
      <main
        id="main-content"
        className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow"
      >
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: Cloudinary cloud name is not configured.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main id="main-content" className="transition-colors duration-slow">
        {/* Minimal header */}
        <div className="max-w-container mx-auto px-page-x pt-page-y pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-fluid-4xl font-bold mb-4 leading-tight">
              Art
            </h1>
            <p className="text-text-secondary text-lg">
              Photos I took. Nothing professional — just things that caught my eye.
            </p>
          </motion.div>
        </div>

        {/* Favorites section */}
        <div className="max-w-container mx-auto px-page-x pb-8">
          <p className="text-xs font-mono text-text-muted mb-4 uppercase tracking-wider">
            Favorites
          </p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 px-1 sm:px-1">
          {favorites.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid mb-1">
              <PhotoTile
                photo={photo}
                index={index}
                onClick={() => setSelectedIndex(photos.indexOf(photo))}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="max-w-container mx-auto px-page-x py-8">
          <div className="border-t border-border-primary" />
          <p className="text-xs font-mono text-text-muted mt-4 uppercase tracking-wider">
            Everything else
          </p>
        </div>

        {/* Collection grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-1 px-1 pb-page-y">
          {collection.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid mb-1">
              <PhotoTile
                photo={photo}
                index={index}
                onClick={() => setSelectedIndex(photos.indexOf(photo))}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
};

export default Art;
