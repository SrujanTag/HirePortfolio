import React, { useEffect, useState } from 'react';
import { Zap, Shield, User, Send, CheckCircle } from '../components/icons';

const HireTalentPage = ({ prefilledMember, onFindTalent }) => {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    role: 'Full Stack Developer',
    budget: '5k-10k',
    description: ''
  });

  useEffect(() => {
    if (prefilledMember) {
      setFormData(prev => ({
        ...prev,
        description: `I would like to inquire about hiring ${prefilledMember.name} (ID: ${prefilledMember.id}). We are impressed by their experience in ${prefilledMember.skills.frontend[0]} and ${prefilledMember.skills.backend[0]}.`,
        role: prefilledMember.role
      }));
    }
  }, [prefilledMember]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prefilledMember) {
      alert(`Request Sent! \nWe'll contact ${formData.email} regarding your request for ${prefilledMember.name}.`);
    } else {
      if (onFindTalent) {
        onFindTalent(formData.role);
      } else {
        alert(`Request Sent! We'll find a ${formData.role} for you.`);
      }
    }
  };

  const benefits = [
    { icon: Zap, title: "Speedy Hiring", desc: "Get matched with candidates in 48 hours." },
    { icon: Shield, title: "Vetted Talent", desc: "Top 1% of engineers passed our rigorous technical exams." },
    { icon: User, title: "Cultural Fit", desc: "We match for soft skills and team dynamics, not just code." },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <div className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            For Employers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {prefilledMember ? `Hire ${prefilledMember.name}` : 'Build your perfect team'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {prefilledMember ? 'and start building today.' : 'with HirePortfolio.'}
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {prefilledMember 
              ? `${prefilledMember.name} is one of our top performers. Fill out the form to schedule an interview immediately.`
              : 'Stop sifting through hundreds of resumes. We connect you with pre-vetted senior developers, designers, and product managers who are ready to start today.'
            }
          </p>

          <div className="space-y-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-800 text-blue-400 border border-gray-700">
                    <item.icon size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Tell us who you need</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Amazon"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Work Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="hiring@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role Needed</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option>Full Stack Developer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Engineer</option>
                  <option>UI/UX Designer</option>
                  <option>Product Manager</option>
                  <option>Data Analyst</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Budget Range</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option>Less than 10k</option>
                  <option>10k - 25k</option>
                  <option>25k - 50k</option>
                  <option>50k - 75k</option>
                  <option>75k - 100k</option>
                  <option>100k+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Project Details</label>
              <textarea 
                rows="3"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Briefly describe your tech stack and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {prefilledMember ? `Send Inquiry for ${prefilledMember.name}` : 'Start Hiring'} <Send size={18} />
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              <span className="inline-flex items-center gap-1 text-green-500 mr-2"><CheckCircle size={12} /> Verified</span>
              No credit card required for initial consultation.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default HireTalentPage;

