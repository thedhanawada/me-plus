const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500 text-sm mb-6">
          "Deeds will not be less valiant because they are unpraised."
        </p>
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <a href="https://github.com/thedhanawada" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            github
          </a>
          <a href="mailto:nirmal@dhanawada.org" className="text-gray-600 hover:text-gray-900">
            email
          </a>
        </div>
        <p className="text-xs text-gray-400">
          Powered by: React, TypeScript, Tailwind
        </p>
      </div>
    </footer>
  );
};

export default Footer;
