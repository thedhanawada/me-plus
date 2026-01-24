import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExternalLink } from '../hooks';

const ExternalLinkModal = () => {
  const { isOpen, pendingUrl, hideModal } = useExternalLink();

  // Extract domain from URL for display
  const getDomain = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleContinue = useCallback(() => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    hideModal();
  }, [pendingUrl, hideModal]);

  const handleCancel = useCallback(() => {
    hideModal();
  }, [hideModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleCancel();
      } else if (e.key === 'Enter') {
        handleContinue();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCancel, handleContinue]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const domain = pendingUrl ? getDomain(pendingUrl) : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-bg-inverted/40 backdrop-blur-sm"
            onClick={handleCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-bg-primary border border-border-primary max-w-sm w-full p-6"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-link-title"
          >
            {/* Header */}
            <div className="mb-4">
              <h2
                id="external-link-title"
                className="text-sm font-mono text-text-secondary"
              >
                [external link]
              </h2>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-text-primary font-mono text-base mb-3">
                You're about to visit
              </p>
              <p className="text-text-primary font-mono text-lg font-bold break-all">
                {domain}
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-text-muted font-mono mb-6">
              This link will open in a new tab. I'm not responsible for external content.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleCancel}
                className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-default focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary px-2 py-1"
              >
                [cancel]
              </button>
              <button
                onClick={handleContinue}
                className="font-mono text-sm bg-bg-inverted text-text-inverted hover:opacity-80 transition-opacity duration-default focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary px-4 py-2"
              >
                [continue →]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExternalLinkModal;
