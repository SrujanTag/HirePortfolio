import React from 'react';
import { FEATURED_PROJECTS, TECH_STACK } from '../data/constants';
import { Rocket, Layers, Cpu, Trophy, MessageSquare, ChevronRight } from '../components/icons';

const HomePage = ({ onNavigate }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-950 text-white overflow-hidden scroll-smooth">
      <section id="hero" className="relative px-4 py-20 lg:py-32 flex flex-col items-center text-center overflow-hidden min-h-[700px] justify-center">
        
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto mt-10">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase">
              Welcome to the future
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight drop-shadow-2xl">
              Meet Our Dev Team <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Building Solutions Together
              </span>
            </h1>
          </div>

          <div>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
              Explore our collective projects and dive into the individual portfolios of our specialized developers and designers.
            </p>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('featured-projects')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-white transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-blue-900/50 flex items-center gap-2 justify-center"
              >
                View Our Projects <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full font-bold text-white transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg backdrop-blur-sm bg-opacity-80"
              >
                Meet the Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-projects" className="px-4 py-20 max-w-7xl mx-auto">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
              <Rocket className="text-purple-500" size={28} /> Featured Projects
            </h2>
            <p className="text-gray-400">Collaborative works built by our team.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id}>
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 group hover:-translate-y-2 h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10"></div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">{tag}</span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700 mt-auto">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tech-stack" className="px-4 py-16 bg-[#0B0E14] border-t border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div>
            <h2 className="text-2xl font-bold mb-10 text-gray-200">Technologies We Work With</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {TECH_STACK.map((tech) => (
              <div key={tech.name}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:border-blue-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 text-gray-500 transition-all duration-300 mb-3 shadow-lg transform group-hover:rotate-6">
                    <tech.icon size={32} />
                  </div>
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="px-4 py-16 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
             <Trophy className="text-yellow-500" size={24} /> What We've Achieved
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 relative hover:border-gray-500 transition-colors">
               <div className="text-4xl text-gray-700 absolute top-4 right-4">"</div>
               <p className="text-gray-300 italic mb-4 z-10 relative">"The team delivered an exceptional MVP for our startup within a tight deadline. Their collaboration skills are top-notch."</p>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">S</div>
                 <span className="text-sm font-bold text-white">Startup Client A</span>
               </div>
             </div>
           </div>

           <div>
             <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center gap-4 hover:border-yellow-500/50 transition-colors group">
                <div className="p-3 bg-yellow-500/10 rounded-full group-hover:bg-yellow-500/20 transition-colors">
                  <Trophy size={40} className="text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">1st Place - SmartIndia Hackathon</h4>
                  <p className="text-sm text-gray-400">National Level Coding Competition 2024</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-center border-t border-gray-800 relative">
        <div>
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Collaborate?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              We are a team of problem solvers ready to tackle your next challenge.
            </p>
            <button 
              onClick={() => onNavigate('hire')}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-white shadow-lg shadow-blue-900/50 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <MessageSquare size={20}/> Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

