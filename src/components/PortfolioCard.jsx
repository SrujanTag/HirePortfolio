import React from 'react';
import { ChevronRight } from './icons';

const PortfolioCard = ({ person, onViewProfile }) => {
  const colorMap = {
    cyan: "from-cyan-400",
    purple: "from-purple-400",
    emerald: "from-emerald-400",
    blue: "from-blue-400",
    pink: "from-pink-400",
    orange: "from-orange-400",
  };

  const gradientFrom = colorMap[person.color] || "from-blue-400";
  const allSkills = [...person.skills.frontend, ...person.skills.backend].slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-br ${gradientFrom} to-blue-600 transform group-hover:scale-110 transition-transform duration-300`}>
            <img 
              src={person.avatar} 
              alt={person.name} 
              className="w-full h-full rounded-full bg-gray-900 object-cover border-2 border-transparent group-hover:border-white transition-all"
            />
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {person.name}
          </h3>
          <p className="text-blue-400 font-medium text-sm mb-3 uppercase tracking-wide">
            {person.role}
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
            {allSkills.map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md border border-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto bg-gray-900/50 p-4 border-t border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-500">Available for hire</span>
        <button 
          onClick={() => onViewProfile(person)}
          className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 hover:gap-2"
        >
          View Profile <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;

