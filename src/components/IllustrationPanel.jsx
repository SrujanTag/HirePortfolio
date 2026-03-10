import React from 'react';

const IllustrationPanel = () => (
  <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 text-center bg-gray-950">
    <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-white">
      Unlock Your <span className="text-blue-400">Creative Potential</span>
    </h1>
    <p className="mb-10 text-xl text-gray-400 max-w-sm">
      Connect with top talent, collaborate, and build amazing things together.
    </p>
    
    <div className="w-full max-w-sm h-auto relative flex justify-center items-center py-10">
      <div className="rounded-full p-6 bg-gray-950 border border-blue-500/30">
        <svg className="w-32 h-32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#38bdf8', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#1e3a8a', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8 8" opacity="0.4"/>
          <rect x="65" y="50" width="20" height="100" rx="10" fill="url(#logoGradient)"/>
          <rect x="115" y="50" width="20" height="100" rx="10" fill="url(#logoGradient)"/>
          <rect x="65" y="90" width="70" height="20" rx="5" fill="url(#logoGradient)"/>
          <circle cx="40" cy="60" r="6" fill="#34d399" opacity="0.9"/>
          <circle cx="160" cy="140" r="6" fill="#facc15" opacity="0.9"/>
          <circle cx="160" cy="40" r="6" fill="#ef4444" opacity="0.9"/>
          <circle cx="40" cy="160" r="6" fill="#c084fc" opacity="0.9"/>
        </svg>
      </div>
    </div>
    
    <p className="mt-12 text-md text-gray-500 max-w-sm">
      Log in now to manage your portfolio and discover new projects.
    </p>
  </div>
);

export default IllustrationPanel;

