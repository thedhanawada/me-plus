import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks';
import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['g', 'h'], description: 'Go to Home', action: 'navigate', path: '/' },
  { keys: ['g', 'a'], description: 'Go to About', action: 'navigate', path: '/about' },
  { keys: ['g', 'w'], description: 'Go to Work', action: 'navigate', path: '/work' },
  { keys: ['g', 'l'], description: 'Go to Lab', action: 'navigate', path: '/lab' },
  { keys: ['g', 'p'], description: 'Go to Photography', action: 'navigate', path: '/art' },
  { keys: ['g', 't'], description: 'Go to TV', action: 'navigate', path: '/tv' },
  { keys: ['g', 'n'], description: 'Go to Notes', action: 'navigate', path: '/notes' },
  { keys: ['t'], description: 'Toggle theme', action: 'theme' },
  { keys: ['?'], description: 'Show shortcuts', action: 'help' },
  { keys: ['Escape'], description: 'Close dialog', action: 'close' },
];

const KeyboardShortcuts = () => {
  const [showHelp, setShowHelp] = useState(false);
  const keySequenceRef = useRef<string[]>([]);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  const handleAction = useCallback((action: string, path?: string) => {
    switch (action) {
      case 'navigate':
        if (path) navigate(path);
        break;
      case 'theme':
        toggleTheme();
        break;
      case 'help':
        setShowHelp(true);
        break;
      case 'close':
        setShowHelp(false);
        break;
    }
  }, [navigate, toggleTheme]);

  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const key = e.key;

      // Handle Escape separately
      if (key === 'Escape') {
        handleAction('close');
        keySequenceRef.current = [];
        return;
      }

      // Handle ? for help
      if (key === '?') {
        e.preventDefault();
        handleAction('help');
        keySequenceRef.current = [];
        return;
      }

      // Build key sequence
      const newSequence = [...keySequenceRef.current, key.toLowerCase()];
      keySequenceRef.current = newSequence;

      // Check for matching shortcuts
      const matchingShortcut = SHORTCUTS.find(shortcut => {
        if (shortcut.keys.length === 1) {
          return shortcut.keys[0].toLowerCase() === key.toLowerCase();
        }
        return shortcut.keys.every((k, i) => newSequence[i]?.toLowerCase() === k.toLowerCase());
      });

      if (matchingShortcut && newSequence.length >= matchingShortcut.keys.length) {
        e.preventDefault();
        handleAction(matchingShortcut.action, matchingShortcut.path);
        keySequenceRef.current = [];
      }

      // Clear previous timer before setting a new one
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = setTimeout(() => { keySequenceRef.current = []; }, 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(sequenceTimerRef.current);
    };
  }, [handleAction]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap, auto-focus, and restore
  useEffect(() => {
    if (showHelp) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Auto-focus the close button
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>('button');
      firstFocusable?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [showHelp]);

  useEffect(() => {
    if (!showHelp) return;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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
    };

    document.addEventListener('keydown', handleTabTrap);
    return () => document.removeEventListener('keydown', handleTabTrap);
  }, [showHelp]);

  if (!showHelp) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-bg-inverted/50 backdrop-blur-sm"
      style={{ zIndex: 'var(--z-modal)' }}
      onClick={() => setShowHelp(false)}
    >
      <div
        ref={dialogRef}
        className="bg-bg-primary border border-border-primary rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-shortcuts-title"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="keyboard-shortcuts-title" className="text-xl font-bold">Keyboard Shortcuts</h2>
          <button
            onClick={() => setShowHelp(false)}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
            aria-label="Close shortcuts dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {SHORTCUTS.filter(s => s.action !== 'close').map(shortcut => (
            <div key={shortcut.keys.join('')} className="flex items-center justify-between">
              <span className="text-text-secondary">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd className="px-2 py-1 text-xs font-mono bg-bg-secondary border border-border-primary rounded">
                      {key === '?' ? '?' : key.toUpperCase()}
                    </kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-text-muted">then</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-text-muted text-center">
          Press <kbd className="px-1.5 py-0.5 bg-bg-secondary border border-border-primary rounded">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
