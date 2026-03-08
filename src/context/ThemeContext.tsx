import { createContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const transitionTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => clearTimeout(transitionTimerRef.current);
  }, []);

  const toggleTheme = useCallback(() => {
    // Add transition class for smooth theme switch
    document.documentElement.classList.add('theme-transitioning');

    setTheme(prev => prev === 'light' ? 'dark' : 'light');

    // Clear any pending timer from rapid toggling
    clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
