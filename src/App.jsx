import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PortfolioGrid from './components/PortfolioGrid';
import HomePage from './pages/HomePage';
import HireTalentPage from './pages/HireTalentPage';
import LoginPage from './pages/LoginPage';
import MemberProfile from './components/MemberProfile';
import AddProfileForm from './components/AddProfileForm';
import { USERS } from './data/constants';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeRole, setActiveRole] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);

  // Users list — starts with the static seed data; new profiles are appended
  const [users, setUsers] = useState(USERS);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // ── Auth ────────────────────────────────────────────────────────────
  const handleLogin = (user) => {
    setCurrentUser(user);
    setActivePage('portfolio');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('home');
    window.scrollTo(0, 0);
  };

  // ── Navigation ──────────────────────────────────────────────────────
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setActivePage('profile_details');
    window.scrollTo(0, 0);
  };

  const handleHireMember = (member) => {
    setSelectedMember(member);
    setActivePage('hire');
    window.scrollTo(0, 0);
  };

  const handleFindTalent = (role) => {
    setActiveRole(role === 'Full Stack Developer' ? 'Full Stack' : role.split(' ')[0]);
    setActivePage('portfolio');
    window.scrollTo(0, 0);
  };

  // ── Add Profile ─────────────────────────────────────────────────────
  const handleAddProfile = (profileData) => {
    setUsers(prev => [...prev, profileData]);
  };

  // ── Delete Profile ───────────────────────────────────────────────────
  const handleDeleteProfile = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // ── Render ──────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={setActivePage} />;

      case 'portfolio':
        return (
          <PortfolioGrid
            users={users}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeRole={activeRole}
            searchQuery={searchQuery}
            onSelectMember={handleSelectMember}
            currentUser={currentUser}
            onAddProfile={() => setActivePage('add_profile')}
            onDeleteProfile={handleDeleteProfile}
          />
        );

      case 'hire':
        return (
          <HireTalentPage
            prefilledMember={selectedMember}
            onFindTalent={handleFindTalent}
          />
        );

      case 'login':
        return <LoginPage onLogin={handleLogin} />;

      case 'profile_details':
        return (
          <MemberProfile
            baseMember={selectedMember}
            onHire={handleHireMember}
            onBack={() => setActivePage('portfolio')}
          />
        );

      case 'add_profile':
        return (
          <AddProfileForm
            currentUser={currentUser}
            onAddProfile={handleAddProfile}
            onBack={() => setActivePage('portfolio')}
          />
        );

      default:
        return (
          <PortfolioGrid
            users={users}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeRole={activeRole}
            searchQuery={searchQuery}
            onSelectMember={handleSelectMember}
            currentUser={currentUser}
            onAddProfile={() => setActivePage('add_profile')}
            onDeleteProfile={handleDeleteProfile}
          />
        );
    }
  };

  const showSidebar = ['portfolio', 'home', 'hire'].includes(activePage);
  const sidebarVariant =
    activePage === 'portfolio' ? undefined :
    activePage === 'hire'      ? 'minimal' :
    'home';

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setSelectedMember(null);
        }}
        toggleSidebar={toggleSidebar}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 relative">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggle={toggleSidebar}
            activeRole={activeRole}
            setActiveRole={activePage === 'portfolio' ? setActiveRole : undefined}
            searchQuery={searchQuery}
            setSearchQuery={activePage === 'portfolio' ? setSearchQuery : undefined}
            variant={sidebarVariant}
          />
        )}

        <div className="flex-1 w-full bg-gray-950">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
