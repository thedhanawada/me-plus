import { motion } from 'framer-motion';
import { useTheme } from '../hooks';

const spring = {
  type: 'spring' as const,
  stiffness: 700,
  damping: 30,
};

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex items-center w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-default focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary ${
        isDark ? 'bg-bg-tertiary' : 'bg-bg-tertiary'
      } ${className}`}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-bg-inverted flex items-center justify-center"
        layout
        transition={spring}
        style={{
          marginLeft: isDark ? 'auto' : '0',
          marginRight: isDark ? '0' : 'auto',
        }}
      >
        <motion.span
          className="text-text-inverted text-[10px] leading-none select-none"
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={spring}
        >
          {isDark ? '◑' : '◐'}
        </motion.span>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
