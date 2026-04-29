import React, { useState } from 'react';
import { ChevronRight, Trash2 } from './icons';
const PortfolioCard = ({
  person,
  onViewProfile,
  onDeleteProfile,
  currentUser
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const colorMap = {
    cyan: 'from-cyan-400',
    purple: 'from-purple-400',
    emerald: 'from-emerald-400',
    blue: 'from-blue-400',
    pink: 'from-pink-400',
    orange: 'from-orange-400',
    red: 'from-red-400',
    yellow: 'from-yellow-400'
  };
  const gradientFrom = colorMap[person.color] || 'from-blue-400';
  const allSkills = [...(person.skills?.frontend || []), ...(person.skills?.backend || [])].slice(0, 3);
  const isAdmin = currentUser?.role === 'admin';
  const isOwner = currentUser && currentUser.email === person.email;
  const canDelete = isAdmin || isOwner;
  const handleDeleteClick = e => {
    e.stopPropagation();
    setConfirmDelete(true);
  };
  const handleConfirm = e => {
    e.stopPropagation();
    onDeleteProfile(person.id);
  };
  const handleCancel = e => {
    e.stopPropagation();
    setConfirmDelete(false);
  };
  const initials = person.name ? person.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  return <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group relative">
      {confirmDelete && <div className="absolute inset-0 z-20 bg-gray-900/95 rounded-xl flex flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <Trash2 size={22} className="text-red-400" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">Delete Profile?</p>
            <p className="text-gray-400 text-sm mt-1">
              {isAdmin && !isOwner ? `Remove ${person.name}'s profile from the portfolio.` : 'Remove your profile from the portfolio.'}
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button onClick={handleCancel} className="flex-1 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button onClick={handleConfirm} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
              Delete
            </button>
          </div>
        </div>}
      <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-br ${gradientFrom} to-blue-600 transform group-hover:scale-110 transition-transform duration-300`}>
            {person.avatar ? <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full bg-gray-900 object-cover border-2 border-transparent group-hover:border-white transition-all" onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }} /> : null}
            <div className={`w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-2 border-transparent group-hover:border-white transition-all text-xl font-black text-white ${person.avatar ? 'hidden' : 'flex'}`}>
              {initials}
            </div>
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">
                {person.name}
              </h3>
              <p className="text-blue-400 font-medium text-sm mb-3 uppercase tracking-wide">
                {person.role}
              </p>
            </div>
            {canDelete && <button onClick={handleDeleteClick} title={isAdmin ? `Delete ${person.name}'s profile` : 'Delete your profile'} className="shrink-0 mt-0.5 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-900/20 transition-all">
                <Trash2 size={16} />
              </button>}
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
            {allSkills.map((skill, index) => <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md border border-gray-600">
                {skill}
              </span>)}
          </div>
        </div>
      </div>
      <div className="mt-auto bg-gray-900/50 p-4 border-t border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-500">Available for hire</span>
        <button onClick={() => onViewProfile(person)} className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 hover:gap-2">
          View Profile <ChevronRight size={16} />
        </button>
      </div>
    </div>;
};
export default PortfolioCard;