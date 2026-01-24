import HoverLink from '../components/HoverLink';

const NotFound = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-content text-center min-h-[50vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-bold">404</h1>
        <p className="text-xl text-text-secondary">
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
