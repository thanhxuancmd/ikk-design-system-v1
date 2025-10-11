import { useState } from 'react';
import { Link } from 'wouter';
import { Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  designSystemLink: string;
  adminLink: string;
  designSystemV2Link: string;
}

export default function Header({ designSystemLink, adminLink, designSystemV2Link }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center">
              <div className="w-10 h-10 bg-[#ff0086] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base">IKK</span>
              </div>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
              Trang chủ
            </Link>
            <span className="text-[#ff0086] font-medium">Design System</span>
            <Link to={designSystemLink} className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium" data-testid="link-admin">
              Admin
            </Link>
            <Link to={designSystemV2Link} className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
              Design System V2
            </Link>
            <a href="#components" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
              Components
            </a>
            <a href="#patterns" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
              Patterns
            </a>
            <a href="#guidelines" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
              Guidelines
            </a>
          </nav>

          {/* Right side - Notification + Auth */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Đăng nhập
              </button>
              <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng ký
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link to="/home" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Trang chủ
            </Link>
            <span className="block px-3 py-2 text-[#ff0086] font-medium text-sm">Design System</span>
            <Link to={adminLink} className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="link-admin-mobile">
              Admin
            </Link>
            <Link to={designSystemV2Link} className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Design System V2
            </Link>
            <a href="#components" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Components
            </a>
            <a href="#patterns" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Patterns
            </a>
            <a href="#guidelines" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Guidelines
            </a>
            
            {/* Mobile Auth Buttons */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
              <button className="flex-1 text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng nhập
              </button>
              <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
