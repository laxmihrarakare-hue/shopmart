import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const location = useLocation();
  const { user, isGuest, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => `
    px-4 py-2 rounded-lg transition-all duration-200
    ${isActive(path)
      ? 'bg-blue-600 text-white'
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="w-9 h-9 text-blue-600" />
            <span className="text-3xl font-extrabold text-blue-700 tracking-tight hover:text-blue-800 transition-colors">
              Smart Price Tracker
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link to="/compare" className={navLinkClass('/compare')}>
              Compare
            </Link>
            <Link to="/about" className={navLinkClass('/about')}>
              About
            </Link>

            {user || isGuest ? (
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm text-gray-600">
                  {isGuest ? 'Guest User' : user?.email}
                </span>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

