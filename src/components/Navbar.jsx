import React, { useState } from 'react';
import { Menu, X, User, Code, Briefcase, LogIn, Filter } from './icons';

const Navbar = ({ activePage, setActivePage, toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: User, id: 'home' },
    { name: 'Portfolio', icon: Code, id: 'portfolio' },
    { name: 'Hire', icon: Briefcase, id: 'hire' },
    { name: 'Login', icon: LogIn, id: 'login' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none hidden md:block"
              title="Toggle Sidebar"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">HirePortfolio</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setActivePage(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
                    ${activePage === link.id 
                      ? 'bg-gray-800 text-blue-400' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  <link.icon size={16} />
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute w-full border-b border-gray-700 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
                  ${activePage === link.id 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            ))}
             <button
                onClick={() => {
                  toggleSidebar();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
              >
                <Filter size={16} /> Filters & Options
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

