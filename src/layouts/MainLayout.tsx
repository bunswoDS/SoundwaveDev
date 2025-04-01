import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">{t('app.title')}</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">{t('app.title')}</Link>
          <Link to="/settings" className="text-gray-600 hover:text-blue-600">{t('buttons.settings')}</Link>
          <Link to="/cms" className="text-gray-600 hover:text-blue-600">{t('cms.title')}</Link>
          <Link to="/docs" className="text-gray-600 hover:text-blue-600">{t('docs.title')}</Link>
        </nav>
      </header>
      
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="flex flex-col px-6 py-2">
            <Link 
              to="/" 
              className="py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('app.title')}
            </Link>
            <Link 
              to="/settings" 
              className="py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('buttons.settings')}
            </Link>
            <Link 
              to="/cms" 
              className="py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('cms.title')}
            </Link>
            <Link 
              to="/docs" 
              className="py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('docs.title')}
            </Link>
          </nav>
        </div>
      )}
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
        <p className="text-sm text-gray-500">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
};

// Styles are primarily handled by Tailwind classes

export default MainLayout;
