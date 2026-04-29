import React, { useEffect, useState } from 'react';
import { Zap, Shield, User, Send, CheckCircle } from '../components/icons';
import { sendHireInquiry } from '../utils/emailService';

const HireTalentPage = ({ prefilledMember, onFindTalent }) => {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    role: 'Full Stack Developer',
    budget: 'Less than 10k',
    description: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledMember) {
      setFormData(prev => ({
        ...prev,
        description: `I would like to inquire about hiring ${prefilledMember.name}. We are impressed by their experience in ${prefilledMember.skills?.frontend?.[0] ?? 'development'} and ${prefilledMember.skills?.backend?.[0] ?? 'backend work'}.`,
        role: prefilledMember.role
      }));
    }
    setStatus('idle');
  }, [prefilledMember]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    if (prefilledMember) {
      // Send email to the targeted member
      const result = await sendHireInquiry({
        toName:    prefilledMember.name,
        toEmail:   prefilledMember.email,
        fromEmail: formData.email,
        company:   formData.company,
        role:      formData.role,
        budget:    formData.budget,
        message:   formData.description,
      });

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Something went wrong. Please try again.');
      }
    } else {
      // No specific member — browse portfolio
      setStatus('success');
      setTimeout(() => {
        if (onFindTalent) onFindTalent(formData.role);
      }, 1500);
    }
  };

  const benefits = [
    { icon: Zap,    title: "Speedy Hiring",  desc: "Get matched with candidates in 48 hours." },
    { icon: Shield, title: "Vetted Talent",  desc: "Top 1% of engineers passed our rigorous technical exams." },
    { icon: User,   title: "Cultural Fit",   desc: "We match for soft skills and team dynamics, not just code." },
  ];

  // ── Success screen ─────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 animate-bounce-slow">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            {prefilledMember ? 'Inquiry Sent! 🎉' : 'Searching for talent...'}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {prefilledMember
              ? <>Your hiring request has been sent directly to <span className="text-white font-semibold">{prefilledMember.name}</span> at <span className="text-blue-400">{prefilledMember.email}</span>. They'll get back to you soon!</>
              : <>We're finding the best <span className="text-white">{formData.role}</span> for you. Taking you to the portfolio…</>
            }
          </p>
          {prefilledMember && (
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 px-6 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm transition-colors"
            >
              Send another inquiry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left info panel */}
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
              ? `${prefilledMember.name} is one of our top performers. Fill out the form to send a direct inquiry to their inbox.`
              : 'Stop sifting through hundreds of resumes. We connect you with pre-vetted senior developers, designers, and product managers who are ready to start today.'
            }
          </p>
          {/* Member email hint */}
          {prefilledMember && (
            <div className="flex items-center gap-2 bg-blue-900/20 border border-blue-500/20 rounded-xl px-4 py-3 mb-6 text-sm">
              <Send size={14} className="text-blue-400 shrink-0" />
              <span className="text-gray-400">
                Inquiry will be delivered to <span className="text-blue-300 font-medium">{prefilledMember.email}</span>
              </span>
            </div>
          )}

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

        {/* Right form panel */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Tell us who you need</h2>

          {/* Error banner */}
          {status === 'error' && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-900/40 border border-red-500/30 text-red-300 text-sm">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
              <input
                type="text"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Amazon"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Your Work Email</label>
              <input
                type="email"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="hiring@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role Needed</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>{prefilledMember ? `Send Inquiry to ${prefilledMember.name}` : 'Start Hiring'} <Send size={18} /></>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              <span className="inline-flex items-center gap-1 text-green-500 mr-2">
                <CheckCircle size={12} /> Verified
              </span>
              No credit card required for initial consultation.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default HireTalentPage;
