import React from 'react';
import { getDetailedData } from '../data/constants';
import { ArrowLeft, User, Zap, Layout, Database, Terminal, Layers, ExternalLink, Briefcase, Github, Linkedin, Mail, BookOpen, Globe, Trophy, Star, CheckCircle } from './icons';

function MemberProfile({ baseMember, onHire, onBack }) {
  const member = getDetailedData(baseMember);
  
  const colors = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    pink: "text-pink-400",
    orange: "text-orange-400",
  };
  const accentColor = colors[member.color] || "text-blue-400";
  
  const [firstName, ...lastName] = member.name.split(" ");

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-300 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-[#1C1F26] px-4 py-2 rounded-full text-sm font-medium border border-[#2F333A]"
        >
          <ArrowLeft size={16}/> Back to Team
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center px-4 pb-16 relative overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-${member.color}-900/20 rounded-full blur-[120px] pointer-events-none`}></div>

        <div className="relative z-10">
           <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gray-700 bg-gray-900/50 text-[10px] tracking-widest uppercase text-gray-400">
             Hello_World
           </div>
           
           <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
             I'm <span className={`text-transparent bg-clip-text bg-gradient-to-r from-white to-${member.color}-500`}>{firstName}</span>
           </h1>
           
           <p className="text-xl md:text-2xl text-gray-400 font-light mb-8 flex items-center justify-center gap-3">
             {member.role} <span className="text-gray-600">•</span> Problem Solver
           </p>

           <div className="flex flex-wrap justify-center gap-3 mb-10">
              {member.badges.map((badge, idx) => (
                <span key={idx} className="px-4 py-1.5 rounded-full bg-[#1C1F26] border border-[#2F333A] text-xs font-bold text-gray-300 flex items-center gap-2">
                   {idx === 0 ? "🚀" : idx === 1 ? "💻" : "🌍"} {badge}
                </span>
              ))}
           </div>

           <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => onHire(member)}
                className={`bg-gradient-to-r from-${member.color}-600 to-${member.color}-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-${member.color}-500/25 hover:shadow-${member.color}-500/40 hover:-translate-y-1 transition-all flex items-center gap-2`}
              >
                <Briefcase size={18} /> Hire Me
              </button>
              <div className="flex gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"><button className="p-3 rounded-full bg-[#1C1F26] hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-[#2F333A]"><Github size={20}/></button></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><button className="p-3 rounded-full bg-[#1C1F26] hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-[#2F333A]"><Linkedin size={20}/></button></a>
                <a href="https://gmail.com" target="_blank" rel="noopener noreferrer"><button className="p-3 rounded-full bg-[#1C1F26] hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-[#2F333A]"><Mail size={20}/></button></a>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
               
               <section>
                 <div className="flex items-center gap-2 mb-4 text-white font-bold text-xl">
                    <User className={accentColor} size={24} /> About
                 </div>
                 <div className="bg-[#11141B] p-8 rounded-2xl border border-[#1F232C] leading-relaxed text-gray-400">
                    <p className="mb-4">{member.bio}</p>
                    <p>Highly skilled in creating scalable, robust web applications. Passionate about clean code, user-centric design, and optimizing performance for millions of users. Always eager to learn new technologies and contribute to open-source communities.</p>
                 </div>
               </section>

               <section>
                 <div className="flex items-center gap-2 mb-4 text-white font-bold text-xl">
                    <Zap className={accentColor} size={24} /> Technical Expertise
                 </div>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {member.arsenal.frontend.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-[#161922] border border-[#252A36] rounded-lg text-sm text-gray-300 hover:border-gray-500 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C] hover:border-[#2F333A] transition-colors">
                       <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400"><Layout size={20}/></div>
                       <h3 className="text-white font-bold mb-4">Frontend</h3>
                       <ul className="space-y-2 text-sm text-gray-400">
                          {member.arsenal.frontend.map(s => <li key={s} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{s}</li>)}
                       </ul>
                    </div>
                     <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C] hover:border-[#2F333A] transition-colors">
                       <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400"><Database size={20}/></div>
                       <h3 className="text-white font-bold mb-4">Backend</h3>
                       <ul className="space-y-2 text-sm text-gray-400">
                          {member.arsenal.backend.map(s => <li key={s} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{s}</li>)}
                       </ul>
                    </div>
                     <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C] hover:border-[#2F333A] transition-colors">
                       <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-400"><Terminal size={20}/></div>
                       <h3 className="text-white font-bold mb-4">Tools</h3>
                       <ul className="space-y-2 text-sm text-gray-400">
                          {member.arsenal.tools.map(s => <li key={s} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>{s}</li>)}
                       </ul>
                    </div>
                 </div>
               </section>

               <section>
                 <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
                    <Layers className={accentColor} size={24} /> Featured Projects
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {member.projects.map((project, idx) => (
                      <div key={idx} className="bg-[#11141B] rounded-2xl overflow-hidden border border-[#1F232C] group hover:border-[#3a4150] transition-all">
                         <div className="h-48 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                            <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={project.title} />
                         </div>
                         <div className="p-6">
                            <h4 className="text-white font-bold text-lg mb-2">{project.title}</h4>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.desc}</p>
                            <div className="flex justify-between items-center">
                               <div className="flex gap-2">
                                  {project.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 bg-[#1C1F26] rounded-md text-gray-300 border border-[#2F333A]">{t}</span>)}
                               </div>
                               <button className="text-gray-500 hover:text-white"><ExternalLink size={16}/></button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
               </section>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C]">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><BookOpen size={18} className="text-blue-400"/> Education</h3>
                      <div>
                         <div className="text-white font-medium">{member.education.school}</div>
                         <div className="text-gray-400 text-sm">{member.education.degree}</div>
                         <div className="text-gray-600 text-xs mt-1">{member.education.year}</div>
                      </div>
                  </div>
                  <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C]">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Globe size={18} className="text-emerald-400"/> Languages</h3>
                      <div className="flex gap-2 flex-wrap">
                          {member.languages.map(l => (
                            <span key={l} className="px-3 py-1 bg-[#1C1F26] border border-[#2F333A] rounded-lg text-sm text-gray-300">
                               {l}
                            </span>
                          ))}
                      </div>
                  </div>
               </div>

            </div>

            <div className="lg:col-span-1 space-y-6">
               
               <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C] sticky top-24">
                  <h3 className="text-white font-bold text-lg mb-6">Availability</h3>
                  
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1F232C]">
                     <span className="text-gray-400 text-sm">Current Status</span>
                     <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-medium border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {member.availability.status}
                     </span>
                  </div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1F232C]">
                     <span className="text-gray-400 text-sm">Timezone</span>
                     <span className="text-white text-sm font-medium">{member.availability.timezone}</span>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                     <span className="text-gray-400 text-sm">Response Time</span>
                     <span className="text-white text-sm font-medium">{member.availability.response}</span>
                  </div>

                  <button 
                     onClick={() => onHire(member)}
                     className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
                  >
                     Hire Me
                  </button>
               </div>

               <div className="bg-[#11141B] p-6 rounded-2xl border border-[#1F232C]">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Trophy size={18} className="text-yellow-400"/> Awards</h3>
                  <div className="space-y-4">
                     {member.awards.map((award, i) => (
                        <div key={i} className="flex gap-3">
                           <Star size={16} className="text-yellow-500 mt-0.5 shrink-0"/>
                           <div>
                              <div className="text-white text-sm font-medium">{award.title}</div>
                              <div className="text-gray-500 text-xs">{award.org}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
         </div>
      </div>

    </div>
  );
}

export default MemberProfile;

