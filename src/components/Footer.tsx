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
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="min-h-[6rem] flex flex-col justify-center">
          {loading && <p className="text-gray-500 text-sm">Fetching a quote...</p>}
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          {!loading && !error && (
            <blockquote className="text-gray-600 italic max-w-2xl mx-auto">
              <p>"{quote}"</p>
              <cite className="mt-2 block text-right not-italic text-sm text-gray-500">— {character}</cite>
            </blockquote>
          )}
        </div>
        <div className="flex justify-center space-x-6 text-sm mb-4 mt-6">
          <a href="https://github.com/thedhanawada" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            github
          </a>
          <a href="mailto:nirmal@dhanawada.org" className="text-gray-600 hover:text-gray-900">
            email
          </a>
        </div>
        <p className="text-xs text-gray-400">
          Powered by: React, TypeScript, Tailwind & The One API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
