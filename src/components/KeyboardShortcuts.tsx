import { useEffect, useState, useCallback } from 'react';
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
  { keys: ['t'], description: 'Toggle theme', action: 'theme' },
  { keys: ['?'], description: 'Show shortcuts', action: 'help' },
  { keys: ['Escape'], description: 'Close dialog', action: 'close' },
];

const KeyboardShortcuts = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
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
        setKeySequence([]);
        return;
      }

      // Handle ? for help
      if (key === '?') {
        e.preventDefault();
        handleAction('help');
        setKeySequence([]);
        return;
      }

      // Build key sequence
      const newSequence = [...keySequence, key.toLowerCase()];
      setKeySequence(newSequence);

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
        setKeySequence([]);
      }

      // Reset sequence after timeout
      setTimeout(() => setKeySequence([]), 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, handleAction]);

  if (!showHelp) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-inverted/50 backdrop-blur-sm"
      onClick={() => setShowHelp(false)}
    >
      <div
        className="bg-bg-primary border border-border-primary rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
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
