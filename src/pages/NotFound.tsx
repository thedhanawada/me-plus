import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-8 text-center min-h-[50vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-bold">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Page not found.
        </p>
        <div>
          <Link
            to="/"
            className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <span className="absolute inset-0 bg-black dark:bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black">
              [back to home]
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
