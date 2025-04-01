import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const CMSLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600' : '';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/cms" className="text-xl md:text-2xl font-bold text-blue-600">SoundWave CMS</Link>
        </div>
        <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Back to Game</Link>
      </header>
      
      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        
        {/* Sidebar - hidden on mobile by default, shown when toggled */}
        <aside 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:static md:translate-x-0 z-20 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4">
            <Link 
              to="/cms" 
              className={`block p-3 rounded mb-1 hover:bg-blue-50 ${isActive('/cms')}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/cms/sounds" 
              className={`block p-3 rounded mb-1 hover:bg-blue-50 ${isActive('/cms/sounds')}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              Sounds
            </Link>
            <Link 
              to="/cms/categories" 
              className={`block p-3 rounded mb-1 hover:bg-blue-50 ${isActive('/cms/categories')}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/cms/languages" 
              className={`block p-3 rounded mb-1 hover:bg-blue-50 ${isActive('/cms/languages')}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              Languages
            </Link>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Mobile breadcrumb/context indicator */}
          <div className="md:hidden flex items-center mb-4 text-sm text-gray-500">
            <ChevronRight size={16} className="mr-1" />
            <span>
              {location.pathname === '/cms' 
                ? 'Dashboard' 
                : location.pathname.split('/').pop() 
                  ? location.pathname.split('/').pop()!.charAt(0).toUpperCase() + 
                    location.pathname.split('/').pop()!.slice(1)
                  : 'Content'}
            </span>
          </div>
          
          <Outlet />
        </main>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
        <p className="text-sm text-gray-500">
          SoundWave CMS - &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default CMSLayout;
