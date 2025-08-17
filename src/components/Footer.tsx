import { useState, useEffect } from 'react';

const Footer = () => {
  const [quote, setQuote] = useState('');
  const [character, setCharacter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const apiKey = import.meta.env.VITE_THE_ONE_API_KEY;
        if (!apiKey) {
          throw new Error("API key not found.");
        }

        // Fetch all quotes
        const quoteResponse = await fetch('https://the-one-api.dev/v2/quote', {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (!quoteResponse.ok) {
          throw new Error('Failed to fetch quotes.');
        }

        const quoteData = await quoteResponse.json();
        const quotes = quoteData.docs;

        if (quotes.length === 0) {
          throw new Error("No quotes found.");
        }

        // Pick a random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote.dialog);

        // Fetch the character name
        const characterResponse = await fetch(`https://the-one-api.dev/v2/character/${randomQuote.character}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (!characterResponse.ok) {
          throw new Error('Failed to fetch character.');
        }

        const characterData = await characterResponse.json();
        setCharacter(characterData.docs[0].name);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <footer className="border-t border-gray-200 mt-16 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="min-h-[6rem] flex flex-col justify-center">
          {loading && <div className="loader"></div>}
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          {!loading && !error && (
            <blockquote className="text-gray-600 italic max-w-2xl mx-auto fade-in dark:text-gray-400">
              <p>"{quote}"</p>
              <cite className="mt-2 block text-right not-italic text-sm text-gray-500 dark:text-gray-400">— {character}</cite>
            </blockquote>
          )}
        </div>
        <div className="flex justify-center space-x-8 text-sm mb-4 mt-6">
          <a
            href="https://github.com/thedhanawada"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black"
          >
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">[github]</span>
          </a>
          <a
            href="mailto:nirmal@dhanawada.org"
            className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black"
          >
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">[email]</span>
          </a>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Forged in the fires of{' '}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">React</span>
          </a>,{' '}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">TypeScript</span>
          </a>, and{' '}
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">Tailwind CSS</span>
          </a>.
          <br />
          Wisdom drawn from the halls of{' '}
          <a href="https://the-one-api.dev/" target="_blank" rel="noopener noreferrer" className="relative px-1 transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-black">
            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">Middle-earth</span>
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
