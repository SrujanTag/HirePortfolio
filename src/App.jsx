import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PortfolioGrid from './components/PortfolioGrid';
import HomePage from './pages/HomePage';
import HireTalentPage from './pages/HireTalentPage';
import LoginPage from './pages/LoginPage';
import MemberProfile from './components/MemberProfile';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeRole, setActiveRole] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setActivePage('profile_details');
    window.scrollTo(0,0);
  };
  
  const handleHireMember = (member) => {
    setSelectedMember(member);
    setActivePage('hire');
    window.scrollTo(0,0);
  };

  const handleFindTalent = (role) => {
    setActiveRole(role === 'Full Stack Developer' ? 'Full Stack' : role.split(' ')[0]);
    setActivePage('portfolio');
    window.scrollTo(0,0);
  };

  const renderContent = () => {
    switch(activePage) {
      case 'home': 
        return (
          <HomePage 
            onNavigate={setActivePage} 
          />
        );
      case 'portfolio': 
        return (
          <PortfolioGrid 
             isSidebarOpen={isSidebarOpen} 
             toggleSidebar={toggleSidebar}
             activeRole={activeRole}
             searchQuery={searchQuery}
             onSelectMember={handleSelectMember}
          />
        );
      case 'hire': 
        return <HireTalentPage prefilledMember={selectedMember} onFindTalent={handleFindTalent} />;
      case 'login': 
        return <LoginPage />;
      case 'profile_details': 
        return <MemberProfile baseMember={selectedMember} onHire={handleHireMember} onBack={() => setActivePage('portfolio')} />;
      default: 
        return (
          <PortfolioGrid 
             isSidebarOpen={isSidebarOpen} 
             toggleSidebar={toggleSidebar}
             activeRole={activeRole}
             searchQuery={searchQuery}
             onSelectMember={handleSelectMember}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
      <Navbar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          setSelectedMember(null); 
        }} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 relative">
        {(activePage === 'portfolio') && (
           <Sidebar 
              isOpen={isSidebarOpen} 
              toggle={toggleSidebar} 
              activeRole={activeRole}
              setActiveRole={setActiveRole}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
           />
        )}
        {(activePage === 'home') && (
           <Sidebar 
              isOpen={isSidebarOpen} 
              toggle={toggleSidebar} 
              variant="home"
           />
        )}
        {(activePage === 'hire') && (
           <Sidebar 
              isOpen={isSidebarOpen} 
              toggle={toggleSidebar} 
              variant="minimal"
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

