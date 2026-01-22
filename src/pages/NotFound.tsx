import HoverLink from '../components/HoverLink';

const NotFound = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-8 text-center min-h-[50vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-bold">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Page not found.
        </p>
        <div>
          <HoverLink to="/">[back to home]</HoverLink>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
