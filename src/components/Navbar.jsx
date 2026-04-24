import React, { useState } from 'react';
import { Menu, X, User, Code, Briefcase, LogIn, LogOut, Filter, Shield } from './icons';

const Navbar = ({ activePage, setActivePage, toggleSidebar, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseNavLinks = [
    { name: 'Home',      icon: User,     id: 'home' },
    { name: 'Portfolio', icon: Code,     id: 'portfolio' },
    { name: 'Hire',      icon: Briefcase, id: 'hire' },
  ];

  const authLink = currentUser
    ? { name: 'Logout', icon: LogOut, id: 'logout' }
    : { name: 'Login',  icon: LogIn,  id: 'login' };

  const navLinks = [...baseNavLinks, authLink];

  const handleNavClick = (id) => {
    if (id === 'logout') {
      onLogout();
    } else {
      setActivePage(id);
    }
    setIsMenuOpen(false);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 h-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full w-full">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2 -ml-2 sm:-ml-4 border-r border-gray-800 pr-4 mr-4 py-2">
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none hidden md:block pl-2"
              title="Toggle Sidebar"
            >
              <Menu size={24} />
            </button>

            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => setActivePage('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                HirePortfolio
              </span>
            </div>
          </div>

          {/* Center / Right: Desktop Nav */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">

            {/* User badge when logged in */}
            {currentUser && (
              <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-2 py-1 rounded-full">
                {/* Avatar: Google photo or icon fallback */}
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-600"
                    referrerPolicy="no-referrer"
                  />
                ) : isAdmin ? (
                  <Shield size={14} className="text-yellow-400 ml-1" />
                ) : (
                  <User size={14} className="text-blue-400 ml-1" />
                )}
                <span className={`text-xs font-semibold pr-1 ${isAdmin ? 'text-yellow-300' : 'text-blue-300'}`}>
                  {isAdmin ? 'Admin' : currentUser.name?.split(' ')[0]}
                </span>
                {isAdmin && (
                  <span className="text-[9px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded-full font-bold tracking-wider">
                    ADMIN
                  </span>
                )}
              </div>
            )}

            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
                    ${link.id === 'logout'
                      ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                      : activePage === link.id
                        ? 'bg-gray-800 text-blue-400'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <link.icon size={16} />
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute w-full border-b border-gray-700 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

            {/* User badge on mobile */}
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-2 mb-1 border-b border-gray-700">
                {isAdmin ? <Shield size={14} className="text-yellow-400" /> : <User size={14} className="text-blue-400" />}
                <span className={`text-sm font-semibold ${isAdmin ? 'text-yellow-300' : 'text-blue-300'}`}>
                  {currentUser.name} {isAdmin && '(Admin)'}
                </span>
              </div>
            )}

            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2
                  ${link.id === 'logout'
                    ? 'text-red-400 hover:bg-red-900/20'
                    : activePage === link.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            ))}

            <button
              onClick={() => { toggleSidebar(); setIsMenuOpen(false); }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <Filter size={16} /> Filters &amp; Options
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
