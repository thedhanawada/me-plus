import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'index', path: '/' },
    { name: 'work', path: '/work' },
    { name: 'lab', path: '/lab' },
    { name: 'art', path: '/art' },
    { name: 'watch', path: '/watchlist' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="py-8 border-b border-gray-900">
          <div className="flex items-end justify-between">
            {/* Left - Name as primary element */}
            <div>
              <Link to="/" className="block">
                <div className="text-3xl font-bold tracking-tight leading-none">
                  N.R Dhanawada
                </div>
              </Link>
            </div>

            {/* Right - Navigation as function list */}
            <nav className="hidden md:flex flex-col items-end space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-mono transition-all duration-200 ${
                      isActive 
                        ? 'text-black font-semibold border-r-4 border-black pr-2' 
                        : 'text-gray-500 hover:text-gray-900 hover:border-r-2 hover:border-gray-300 pr-2'
                    }`}
                  >
                    {item.name}()
                  </Link>
                );
              })}
              
              <div className="pt-2 border-t border-gray-200 mt-2">
                <a
                  href="https://github.com/thedhanawada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gray-600 font-mono"
                >
                  github.com/thedhanawada
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block text-lg font-mono ${
                        isActive 
                          ? 'text-black font-semibold' 
                          : 'text-gray-600'
                      }`}
                    >
                      {item.name}()
                    </Link>
                  );
                })}
                
                <div className="pt-3 mt-4 border-t border-gray-200">
                  <a
                    href="https://github.com/thedhanawada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 font-mono"
                  >
                    github.com/thedhanawada
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 