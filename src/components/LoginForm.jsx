import React, { useState } from 'react';
import { GoogleIcon, GitHubIcon } from './icons';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ message: '', isError: false, isVisible: false });

  const displayStatus = (msg, isError = true) => {
    setStatus({ message: msg, isError: isError, isVisible: true });
    if (!isError) {
      setTimeout(() => {
        setStatus({ message: '', isError: false, isVisible: false });
        setEmail('');
        setPassword('');
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ message: '', isError: false, isVisible: false });

    if (!email) return displayStatus("Email address is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return displayStatus("Please enter a valid email address.");
    if (!password) return displayStatus("Password is required.");
    if (password.length < 6) return displayStatus("Password must be at least 6 characters long.");

    displayStatus("Login successful! Redirecting...", false);
  };

  const statusClasses = status.isVisible 
    ? (status.isError ? "bg-red-900/50 border border-red-800 text-red-200" : "bg-green-900/50 border border-green-800 text-green-200")
    : "hidden";

  return (
    <div className="w-full lg:w-1/2 p-6 sm:p-12 flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Sign in to continue your journey</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="bg-gray-800 border border-gray-700 text-gray-200 w-full p-3.5 pr-12 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-xs font-medium text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-wider"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label htmlFor="remember" className="flex items-center text-gray-400 cursor-pointer select-none">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 mr-2 accent-blue-500" /> 
              Remember me
            </label>
            <button type="button" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Forgot Password?</button>
          </div>

          <div className={`p-3 rounded-lg text-sm transition-all duration-300 text-center ${statusClasses}`}>
            {status.message}
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg transform transition hover:-translate-y-0.5">
            Sign In
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-500 uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <div className="space-y-3">
            <button type="button" className="w-full flex items-center justify-center border border-gray-700 bg-gray-900 text-gray-300 py-3 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 font-medium">
              <GoogleIcon />
              Sign in with Google
            </button>
            <button type="button" className="w-full flex items-center justify-center border border-gray-700 bg-gray-900 text-gray-300 py-3 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 font-medium">
              <GitHubIcon />
              Sign in with GitHub
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-400">
            Don’t have an account? 
            <button className="ml-1 text-blue-500 font-bold hover:text-blue-400 transition-colors">Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

