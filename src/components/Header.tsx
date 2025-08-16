import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: '~', path: '/' },
    { name: 'work', path: '/work' },
    { name: 'lab', path: '/lab' },
    { name: 'art', path: '/art' },
    { name: 'watch', path: '/watchlist' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">
            N.R Dhanawada
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm ${
                    isActive 
                      ? 'font-semibold text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <a
              href="https://github.com/thedhanawada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              github
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-2 text-sm ${
                      isActive 
                        ? 'font-semibold text-gray-900' 
                        : 'text-gray-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <a
                href="https://github.com/thedhanawada"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm text-gray-600"
              >
                github
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 