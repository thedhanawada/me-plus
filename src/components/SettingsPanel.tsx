import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../hooks';

const SettingsPanel = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { settings, updateSetting } = useSettings();

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Site settings"
        className="px-3 py-1.5 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
      >
        [settings]
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Site settings"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-bg-primary border border-border-primary rounded-lg shadow-lg overflow-hidden"
            style={{ zIndex: 60 }}
          >
            <div className="px-4 py-3 border-b border-border-primary">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                Settings
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* Dot Grid Toggle */}
              <label className="flex items-center justify-between gap-3 cursor-pointer group">
                <div>
                  <span className="text-sm text-text-primary block">Background grid</span>
                  <span className="text-xs text-text-muted">Interactive dot pattern</span>
                </div>
                <button
                  role="switch"
                  aria-checked={settings.showDotGrid}
                  onClick={() => updateSetting('showDotGrid', !settings.showDotGrid)}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-default focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary ${
                    settings.showDotGrid ? 'bg-text-primary' : 'bg-bg-tertiary'
                  }`}
                >
                  <motion.div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full ${
                      settings.showDotGrid ? 'bg-bg-primary' : 'bg-text-muted'
                    }`}
                    animate={{ x: settings.showDotGrid ? 20 : 0 }}
                    transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  />
                </button>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPanel;
