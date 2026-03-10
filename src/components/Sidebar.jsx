import React from 'react';
import { Settings, Filter, Search, Rocket, Layers, Cpu, Trophy, X, HelpCircle, Mail } from './icons';

const Sidebar = ({ isOpen, toggle, activeRole, setActiveRole, searchQuery, setSearchQuery, variant = 'default' }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      className={`
        bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out z-40
        fixed top-16 bottom-0 overflow-y-auto
        md:relative md:top-0 md:bottom-auto md:h-auto md:overflow-visible
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0'}
      `}
    >
      <div className={`p-4 w-64 ${!isOpen && 'hidden'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            {variant === 'minimal' ? <Settings size={18} className="text-blue-500"/> : <Filter size={18} className="text-blue-500"/>} 
            {variant === 'minimal' ? 'Options' : variant === 'home' ? 'Navigate' : 'Filters'}
          </h3>
          <button onClick={toggle} className="md:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>

        {variant === 'default' && (
          <>
            <div className="mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-gray-300 text-sm rounded-lg pl-9 pr-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Filter by Role</h4>
              <div className="space-y-2">
                <label 
                  onClick={() => setActiveRole('All')}
                  className={`flex items-center space-x-2 text-sm cursor-pointer group ${activeRole === 'All' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                >
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${activeRole === 'All' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600'}`}>
                    {activeRole === 'All' && <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>}
                  </div>
                  <span>All Roles</span>
                </label>
                {['Frontend', 'Backend', 'Full Stack', 'UI/UX', 'Product', 'Data'].map((role) => (
                  <label 
                    key={role} 
                    onClick={() => setActiveRole(role)}
                    className={`flex items-center space-x-2 text-sm cursor-pointer group ${activeRole === role ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    <div className={`w-4 h-4 border rounded flex items-center justify-center ${activeRole === role ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600 group-hover:border-blue-500'}`}>
                      {activeRole === role && <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>}
                    </div>
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-300 text-sm cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Available Now</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-300 text-sm cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span>In 2 Weeks</span>
                </label>
              </div>
            </div>
          </>
        )}

        {variant === 'minimal' && (
          <div className="mb-6">
             <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-6">
               <h4 className="text-white text-sm font-bold mb-2">Hiring Support</h4>
               <p className="text-xs text-gray-400 mb-3">Not sure who you need? We can help you define the role.</p>
               <button className="text-xs bg-blue-600/20 text-blue-400 px-3 py-2 rounded border border-blue-600/30 hover:bg-blue-600/30 w-full">Schedule Call</button>
             </div>
          </div>
        )}

        {variant === 'home' && (
          <div className="mb-6 space-y-4">
             <div className="space-y-2">
               <button onClick={() => scrollToSection('hero')} className="flex items-center gap-3 text-gray-300 hover:text-white w-full text-left p-2 rounded hover:bg-gray-800 transition-colors text-sm">
                 <Rocket size={16} /> Welcome
               </button>
               <button onClick={() => scrollToSection('featured-projects')} className="flex items-center gap-3 text-gray-300 hover:text-white w-full text-left p-2 rounded hover:bg-gray-800 transition-colors text-sm">
                 <Layers size={16} /> Projects
               </button>
               <button onClick={() => scrollToSection('tech-stack')} className="flex items-center gap-3 text-gray-300 hover:text-white w-full text-left p-2 rounded hover:bg-gray-800 transition-colors text-sm">
                 <Cpu size={16} /> Technologies
               </button>
               <button onClick={() => scrollToSection('achievements')} className="flex items-center gap-3 text-gray-300 hover:text-white w-full text-left p-2 rounded hover:bg-gray-800 transition-colors text-sm">
                 <Trophy size={16} /> Achievements
               </button>
             </div>
          </div>
        )}

        <hr className="border-gray-800 my-6" />

        <div>
          <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-3">
             <li className="flex items-center gap-3 text-gray-400 hover:text-blue-400 text-sm cursor-pointer transition-colors">
               <Settings size={16} /> Settings
             </li>
             <li className="flex items-center gap-3 text-gray-400 hover:text-blue-400 text-sm cursor-pointer transition-colors">
               <HelpCircle size={16} /> Help Center
             </li>
             <li className="flex items-center gap-3 text-gray-400 hover:text-blue-400 text-sm cursor-pointer transition-colors">
               <Mail size={16} /> Contact Support
             </li>
          </ul>
        </div>
        
        
      </div>
    </aside>
  );
};

export default Sidebar;

