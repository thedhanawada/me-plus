const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Quote */}
          <blockquote className="text-center">
            <p className="text-gray-600 italic max-w-2xl mx-auto">
              "I do not love the bright sword for its sharpness, nor the arrow for its swiftness, 
              nor the warrior for his glory. I love only that which they defend."
            </p>
            <footer className="mt-4">
              <cite className="text-sm text-gray-500">— Faramir</cite>
            </footer>
          </blockquote>

          {/* Links and Info */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6 text-sm">
              <a href="https://github.com/thedhanawada" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-gray-900">
                github
              </a>
              <a href="mailto:nirmal@dhanawada.org" 
                 className="text-gray-600 hover:text-gray-900">
                email
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Built with React, TypeScript, and Tailwind</p>
              <p className="mt-2">© {new Date().getFullYear()} N.R Dhanawada</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
