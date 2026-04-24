import React, { useMemo } from 'react';
import { User, Filter, Plus } from './icons';
import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({
  users,
  isSidebarOpen,
  toggleSidebar,
  activeRole,
  searchQuery,
  onSelectMember,
  currentUser,
  onAddProfile,
  onDeleteProfile,
}) => {
  const filteredMembers = useMemo(() => {
    return users.filter(user => {
      const matchesRole = activeRole === 'All' || user.role.includes(activeRole);
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(user.skills).flat().some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRole && matchesSearch;
    });
  }, [users, activeRole, searchQuery]);

  return (
    <div className="flex-1 bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Meet Our Team
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Browse through our talented team of developers and designers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Profile button — visible when logged in */}
            {currentUser && (
              <button
                onClick={onAddProfile}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Plus size={16} />
                Add Your Profile
              </button>
            )}

            {!isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="md:hidden flex items-center gap-2 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg text-sm border border-gray-700"
              >
                <Filter size={16} /> Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div key={member.id}>
              <PortfolioCard
                person={member}
                onViewProfile={onSelectMember}
                currentUser={currentUser}
                onDeleteProfile={onDeleteProfile}
              />
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
              <User size={48} className="mx-auto text-gray-700 mb-4" />
              <h3 className="text-white font-bold text-xl">No team members found</h3>
              <p className="text-gray-500">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
