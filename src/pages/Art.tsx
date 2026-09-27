import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { photos, type Photo } from '../data';
import PlainPage, { link } from '../components/Plain';
import { CLOUDINARY_CLOUD_NAME } from '../env';

// ---------------------------------------------------------------------------
// PhotoTile — individual photo in the masonry grid
// ---------------------------------------------------------------------------
const PhotoTile = ({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="block w-full bg-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    aria-label={`View photo: ${photo.alt}`}
    title={photo.alt}
  >
    <CloudinaryImage
      cloudName={CLOUDINARY_CLOUD_NAME}
      publicId={photo.id}
      alt={photo.alt}
      className="w-full h-full object-cover"
      loading="lazy"
      width="600"
      quality="auto"
      fetchFormat="auto"
    />
  </button>
);

// ---------------------------------------------------------------------------
// Lightbox — full-screen photo viewer with swipe + crossfade
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

  // Touch/swipe state
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchDeltaRef = useRef(0);
  const isSwiping = useRef(false);

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

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchDeltaRef.current = 0;
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;

    // Only count as swipe if horizontal movement is dominant
    if (!isSwiping.current && Math.abs(deltaX) > 10) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        isSwiping.current = true;
      }
    }

    if (isSwiping.current) {
      e.preventDefault();
      touchDeltaRef.current = deltaX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isSwiping.current) {
      const threshold = 50;
      if (touchDeltaRef.current > threshold) {
        onPrev();
      } else if (touchDeltaRef.current < -threshold) {
        onNext();
      }
    }
    touchStartRef.current = null;
    touchDeltaRef.current = 0;
    isSwiping.current = false;
  }, [onPrev, onNext]);

  // Preload adjacent images
  useEffect(() => {
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${photo.alt}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop — always black, whatever the theme */}
      <div className="absolute inset-0 bg-black" />

      <div className="absolute top-0 inset-x-0 flex justify-between p-4 font-mono text-sm text-white/60 z-10">
        <span>{currentIndex + 1} / {total}</span>
        <button onClick={onClose} className="hover:text-white underline underline-offset-2" aria-label="Close photo viewer">
          close (esc)
        </button>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 flex justify-between items-baseline gap-4 p-4 font-mono text-sm text-white/60 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onPrev} className="hover:text-white underline underline-offset-2 shrink-0" aria-label="Previous photo">
          ← prev
        </button>
        <span className="text-xs text-white/40 text-center truncate">{photo.alt}</span>
        <button onClick={onNext} className="hover:text-white underline underline-offset-2 shrink-0" aria-label="Next photo">
          next →
        </button>
      </div>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center z-[5]"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <div
            className="bg-white/5"
            style={{
              width: Math.min(photo.width, 1600),
              maxWidth: '90vw',
              aspectRatio: `${photo.width} / ${photo.height}`,
              maxHeight: '80vh',
            }}
          />
        )}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CloudinaryImage
              cloudName={cloudName}
              publicId={photo.id}
              alt={photo.alt}
              className="max-w-[90vw] max-h-[80vh] object-contain"
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
      <PlainPage>
        <h1 className="text-2xl font-bold text-text-primary mb-6">Photographs</h1>
        <p>The photos can't load: VITE_CLOUDINARY_CLOUD_NAME isn't set for this build.</p>
      </PlainPage>
    );
  }

  const open = (photo: Photo) => setSelectedIndex(photos.indexOf(photo));

  return (
    <>
      <PlainPage wide>
        <div className="max-w-[72ch]">
          <h1 className="text-2xl font-bold text-text-primary mb-6">Photographs</h1>
          <p>
            {photos.length} of them. Click one to see it larger; the arrow
            keys work from there, and so does swiping. Or <a href="#all" className={link}>skip to the rest</a>.
          </p>
          <h2 className="font-bold text-text-primary mt-12 mb-4">Favourites</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
          {favorites.map((photo) => (
            <PhotoTile key={photo.id} photo={photo} onClick={() => open(photo)} />
          ))}
        </div>

        <h2 id="all" className="font-bold text-text-primary mt-12 mb-4 scroll-mt-8">Everything else</h2>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {collection.map((photo) => (
            <div key={photo.id} className="break-inside-avoid mb-2">
              <PhotoTile photo={photo} onClick={() => open(photo)} />
            </div>
          ))}
        </div>
      </PlainPage>

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
