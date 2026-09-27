import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks';

const ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  notes: '/notes',
  art: '/art',
  tv: '/tv',
};

const HELP = 'about  notes  art  tv  theme  github  clear';

interface Line {
  id: number;
  input: string;
  output: string;
}

/**
 * A small working shell at the bottom of the landing page. Typing a page name
 * navigates there; everything is also reachable by plain links above, so this
 * is a shortcut, not the primary navigation.
 */
const TerminalPrompt = () => {
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // "/" focuses the prompt from anywhere on the page
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return;
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const run = (raw: string): string | null => {
    const cmd = raw.trim().toLowerCase().replace(/^cd\s+~?\/?/, '').replace(/^\.\//, '');

    if (cmd === '') return null;
    if (cmd in ROUTES) {
      setTimeout(() => navigate(ROUTES[cmd]), 250);
      return `→ opening /${cmd === 'home' ? '' : cmd}`;
    }

    switch (cmd) {
      case 'help':
      case 'ls':
        return HELP;
      case 'theme': {
        const next = theme === 'dark' ? 'light' : 'dark';
        toggleTheme();
        return `theme set to ${next}`;
      }
      case 'github':
        window.open('https://github.com/thedhanawada', '_blank', 'noopener,noreferrer');
        return '→ github.com/thedhanawada';
      case 'whoami':
        return 'nr dhanawada — solutions architect';
      case 'sudo':
      case 'sudo su':
      case 'rm -rf /':
        return 'nice try.';
      case 'exit':
        return "there's no leaving. try `about`.";
      default:
        return `command not found: ${cmd.split(' ')[0]} — try \`help\``;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = value;
      setValue('');
      setHistoryIndex(-1);
      if (input.trim()) setHistory((h) => [input, ...h].slice(0, 20));

      if (input.trim().toLowerCase() === 'clear') {
        setLines([]);
        return;
      }
      const output = run(input);
      if (output === null) return;
      setLines((prev) => [...prev, { id: idRef.current++, input, output }].slice(-3));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(next >= 0 ? history[next] : '');
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <div className="font-mono text-sm sm:text-base" onClick={() => inputRef.current?.focus()}>
      <div aria-live="polite" className="space-y-1 mb-1">
        {lines.map((line) => (
          <div key={line.id}>
            <p className="text-text-muted">
              <span className="text-prompt select-none">$ </span>
              {line.input}
            </p>
            <p className="text-text-secondary pl-4">{line.output}</p>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 cursor-text">
        <span className="text-prompt select-none" aria-hidden="true">$</span>
        <span className="sr-only">Command prompt. Type help for a list of commands.</span>
        <span className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="peer w-full bg-transparent text-text-primary caret-transparent outline-none placeholder:text-text-muted"
            placeholder=""
          />
          {/* Block cursor that follows the typed text */}
          <span aria-hidden="true" className="pointer-events-none absolute left-0 flex items-center whitespace-pre opacity-40 peer-focus:opacity-100">
            <span className="invisible">{value}</span>
            <span className="terminal-cursor" />
          </span>
          {value === '' && (
            <span aria-hidden="true" className="pointer-events-none absolute left-[1.2em] text-text-muted text-xs sm:text-sm">
              type <span className="text-text-secondary">help</span>, or press <kbd className="text-text-secondary">/</kbd>
            </span>
          )}
        </span>
      </label>
    </div>
  );
};

export default TerminalPrompt;
