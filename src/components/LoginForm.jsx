import React, { useState } from 'react';

// ── Persistent user store (localStorage) ────────────────────────────────────
const STORAGE_KEY = 'hp_registered_users';

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUser = (user) => {
  const existing = getStoredUsers();
  const updated  = [...existing, user];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// ── Seeded admin (never in localStorage) ────────────────────────────────────
const ADMIN = { email: 'admin@admin.com', password: 'admin', name: 'Admin', role: 'admin' };

// ─────────────────────────────────────────────────────────────────────────────
const LoginForm = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  // shared fields
  const [name,            setName]            = useState('');
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword,    setShowPassword]    = useState(false);
  const [status, setStatus] = useState({ message: '', isError: false });

  const displayStatus = (msg, isError = true) => setStatus({ message: msg, isError });
  const clearStatus   = ()                     => setStatus({ message: '', isError: false });

  const switchMode = (m) => {
    setMode(m);
    setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
    clearStatus();
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    clearStatus();

    if (!email)    return displayStatus('Email is required.');
    if (!password) return displayStatus('Password is required.');

    // Check admin first
    if (
      email.toLowerCase() === ADMIN.email &&
      password === ADMIN.password
    ) {
      displayStatus('Welcome, Admin!', false);
      setTimeout(() => onLogin?.({ email: ADMIN.email, name: ADMIN.name, role: 'admin' }), 600);
      return;
    }

    // Check localStorage registered users
    const stored = getStoredUsers();
    const found  = stored.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      displayStatus(`Welcome back, ${found.name}!`, false);
      setTimeout(() => onLogin?.({ email: found.email, name: found.name, role: 'user' }), 600);
    } else {
      displayStatus('Invalid email or password.');
    }
  };

  // ── SIGN UP ────────────────────────────────────────────────────────────────
  const handleSignUp = (e) => {
    e.preventDefault();
    clearStatus();

    if (!name.trim())    return displayStatus('Full name is required.');
    if (!email.trim())   return displayStatus('Email is required.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return displayStatus('Enter a valid email address.');
    if (password.length < 6)           return displayStatus('Password must be at least 6 characters.');
    if (password !== confirmPassword)  return displayStatus('Passwords do not match.');

    // Check duplicate
    const stored    = getStoredUsers();
    const duplicate = stored.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (duplicate || email.toLowerCase() === ADMIN.email) {
      return displayStatus('An account with this email already exists.');
    }

    const newUser = { name: name.trim(), email: email.toLowerCase(), password, role: 'user' };
    saveUser(newUser);

    displayStatus(`Account created! Welcome, ${newUser.name}!`, false);
    setTimeout(() => onLogin?.({ email: newUser.email, name: newUser.name, role: 'user' }), 800);
  };

  const statusClass = status.message
    ? status.isError
      ? 'bg-red-900/50 border border-red-800 text-red-200'
      : 'bg-green-900/50 border border-green-800 text-green-200'
    : 'hidden';

  return (
    <div className="w-full lg:w-1/2 p-6 sm:p-12 flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">

        {/* ── Mode Tabs ── */}
        <div className="flex bg-gray-800 rounded-2xl p-1 mb-8">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === 'signup'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* ── Header ── */}
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {mode === 'login'
              ? 'Sign in to manage your portfolio'
              : 'Join the team and showcase your skills'}
          </p>
        </div>

        {/* ── Status ── */}
        {status.message && (
          <div className={`p-3 rounded-xl text-sm text-center mb-5 ${statusClass}`}>
            {status.message}
          </div>
        )}

        {/* ── SIGN IN FORM ── */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Quick fills */}
            <div className="flex gap-2 flex-wrap">
              <button type="button"
                onClick={() => { setEmail('admin@admin.com'); setPassword('admin'); }}
                className="text-[11px] px-3 py-1 bg-yellow-900/30 border border-yellow-800/40 rounded-full text-yellow-400 hover:bg-yellow-800/50 transition-colors"
              >👑 Admin</button>
              <button type="button"
                onClick={() => {
                  const u = getStoredUsers()[0];
                  if (u) { setEmail(u.email); setPassword(u.password); }
                  else displayStatus('No registered users yet. Sign up first!');
                }}
                className="text-[11px] px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
              >🧑 Last Registered User</button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 pr-14 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-xs text-gray-400 hover:text-blue-400 uppercase tracking-wider transition-colors">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5">
              Sign In
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button type="button" onClick={() => switchMode('signup')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign Up
              </button>
            </p>
          </form>
        )}

        {/* ── SIGN UP FORM ── */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                placeholder="Jane Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password <span className="text-gray-500 font-normal text-xs">(min. 6 chars)</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 pr-14 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-xs text-gray-400 hover:text-blue-400 uppercase tracking-wider transition-colors">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`bg-gray-800 border text-gray-200 w-full p-3.5 rounded-xl focus:ring-1 outline-none transition-all placeholder-gray-600 ${
                  confirmPassword && confirmPassword !== password
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition hover:-translate-y-0.5">
              Create Account
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button type="button" onClick={() => switchMode('login')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
