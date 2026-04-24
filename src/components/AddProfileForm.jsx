import React, { useState } from 'react';
import { ArrowLeft, User, Zap, Terminal } from './icons';

const COLORS = ['cyan', 'purple', 'emerald', 'blue', 'pink', 'orange', 'red', 'yellow'];
const ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Analyst',
  'DevOps Engineer',
  'Mobile Developer',
];

const AddProfileForm = ({ onAddProfile, onBack, currentUser }) => {
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    role: ROLES[0],
    bio: '',
    email: currentUser?.email || '',
    color: 'cyan',
    frontendSkills: '',
    backendSkills: '',
    tools: '',
    github: '',
    linkedin: '',
    school: 'Indian Institute of Information Technology',
    degree: 'B.Tech Computer Science',
    year: '2025–2029',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.bio.trim()) e.bio = 'Bio is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    if (!form.frontendSkills.trim()) e.frontendSkills = 'At least one skill is required.';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const splitSkills = (str) => str.split(',').map(s => s.trim()).filter(Boolean);

    const newProfile = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role,
      bio: form.bio.trim(),
      email: form.email.trim(),
      color: form.color,
      avatar: null,
      skills: {
        frontend: splitSkills(form.frontendSkills),
        backend: splitSkills(form.backendSkills),
        tools: splitSkills(form.tools),
      },
      github: form.github.trim(),
      linkedin: form.linkedin.trim(),
      education: {
        school: form.school.trim(),
        degree: form.degree.trim(),
        year: form.year.trim(),
      },
    };

    onAddProfile(newProfile);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Profile Created!</h2>
          <p className="text-gray-400 mb-8">Your profile has been added to the portfolio grid.</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:-translate-y-1 transition-all shadow-lg shadow-blue-500/25"
          >
            View Portfolio
          </button>
        </div>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full bg-[#1C1F26] border ${errors[field] ? 'border-red-500' : 'border-[#2F333A]'} text-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm`;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-300 pb-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-[#1C1F26] px-4 py-2 rounded-full text-sm font-medium border border-[#2F333A] mb-8"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        {/* Hero */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-gray-700 bg-gray-900/50 text-[10px] tracking-widest uppercase text-gray-400">
              Add Your Profile
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Tell the world{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                who you are
              </span>
            </h1>
            <p className="text-gray-400">Fill in your details and get featured on the portfolio grid.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="bg-[#11141B] rounded-2xl border border-[#1F232C] p-6 space-y-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <User size={20} className="text-blue-400" /> Basic Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name *</label>
                <input className={inputClass('name')} placeholder="e.g. Jane Doe" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email *</label>
                <input className={inputClass('email')} placeholder="you@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Role</label>
                <select className={inputClass('role')} value={form.role} onChange={e => handleChange('role', e.target.value)}>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Profile Color</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleChange('color', c)}
                      title={c}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-transparent'} bg-${c}-500`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Bio * <span className="text-gray-600">(2-3 sentences)</span></label>
              <textarea
                rows={3}
                className={inputClass('bio')}
                placeholder="Describe yourself, your passion, and what you bring to the table..."
                value={form.bio}
                onChange={e => handleChange('bio', e.target.value)}
              />
              {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio}</p>}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#11141B] rounded-2xl border border-[#1F232C] p-6 space-y-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" /> Skills <span className="text-xs font-normal text-gray-500">(comma-separated)</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Frontend / Primary Skills *
              </label>
              <input className={inputClass('frontendSkills')} placeholder="React, TypeScript, Tailwind CSS" value={form.frontendSkills} onChange={e => handleChange('frontendSkills', e.target.value)} />
              {errors.frontendSkills && <p className="text-red-400 text-xs mt-1">{errors.frontendSkills}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Backend / Secondary Skills
              </label>
              <input className={inputClass('backendSkills')} placeholder="Node.js, Express, MongoDB" value={form.backendSkills} onChange={e => handleChange('backendSkills', e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Tools & Others
              </label>
              <input className={inputClass('tools')} placeholder="Git, Docker, Figma" value={form.tools} onChange={e => handleChange('tools', e.target.value)} />
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#11141B] rounded-2xl border border-[#1F232C] p-6 space-y-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Terminal size={20} className="text-purple-400" /> Links & Education
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub URL</label>
                <input className={inputClass('github')} placeholder="https://github.com/username" value={form.github} onChange={e => handleChange('github', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn URL</label>
                <input className={inputClass('linkedin')} placeholder="https://linkedin.com/in/username" value={form.linkedin} onChange={e => handleChange('linkedin', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">School / University</label>
                <input className={inputClass('school')} value={form.school} onChange={e => handleChange('school', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Year</label>
                <input className={inputClass('year')} placeholder="2025–2029" value={form.year} onChange={e => handleChange('year', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Degree</label>
              <input className={inputClass('degree')} value={form.degree} onChange={e => handleChange('degree', e.target.value)} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all text-base"
            >
              🚀 Add to Portfolio
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-4 rounded-xl border border-[#2F333A] text-gray-400 hover:text-white hover:border-gray-600 transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfileForm;
