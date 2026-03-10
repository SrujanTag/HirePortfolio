import React from 'react';

export const IconWrapper = ({ children, size = 24, className = "", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const Menu = (p) => <IconWrapper {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
export const X = (p) => <IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
export const Github = (p) => <IconWrapper {...p}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></IconWrapper>;
export const Linkedin = (p) => <IconWrapper {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></IconWrapper>;
export const ExternalLink = (p) => <IconWrapper {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></IconWrapper>;
export const Code = (p) => <IconWrapper {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></IconWrapper>;
export const User = (p) => <IconWrapper {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>;
export const Briefcase = (p) => <IconWrapper {...p}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconWrapper>;
export const DollarSign = (p) => <IconWrapper {...p}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></IconWrapper>;
export const LogIn = (p) => <IconWrapper {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></IconWrapper>;
export const ChevronRight = (p) => <IconWrapper {...p}><path d="m9 18 6-6-6-6"/></IconWrapper>;
export const Filter = (p) => <IconWrapper {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></IconWrapper>;
export const Search = (p) => <IconWrapper {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconWrapper>;
export const Settings = (p) => <IconWrapper {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
export const HelpCircle = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></IconWrapper>;
export const Mail = (p) => <IconWrapper {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconWrapper>;
export const ArrowLeft = (p) => <IconWrapper {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconWrapper>;
export const Zap = (p) => <IconWrapper {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconWrapper>;
export const Layout = (p) => <IconWrapper {...p}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="9" y2="21"/></IconWrapper>;
export const Database = (p) => <IconWrapper {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></IconWrapper>;
export const Terminal = (p) => <IconWrapper {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></IconWrapper>;
export const Layers = (p) => <IconWrapper {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></IconWrapper>;
export const BookOpen = (p) => <IconWrapper {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconWrapper>;
export const Globe = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></IconWrapper>;
export const Trophy = (p) => <IconWrapper {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></IconWrapper>;
export const Star = (p) => <IconWrapper {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconWrapper>;
export const CheckCircle = (p) => <IconWrapper {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>;
export const Send = (p) => <IconWrapper {...p}><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></IconWrapper>;
export const Shield = (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></IconWrapper>;
export const Rocket = (p) => <IconWrapper {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></IconWrapper>;
export const MessageSquare = (p) => <IconWrapper {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></IconWrapper>;
export const Palette = (p) => <IconWrapper {...p}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></IconWrapper>;
export const Cpu = (p) => <IconWrapper {...p}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" x2="9" y1="1" y2="4"/><line x1="15" x2="15" y1="1" y2="4"/><line x1="9" x2="9" y1="20" y2="23"/><line x1="15" x2="15" y1="20" y2="23"/><line x1="20" x2="23" y1="9" y2="9"/><line x1="20" x2="23" y1="15" y2="15"/><line x1="1" x2="4" y1="9" y2="9"/><line x1="1" x2="4" y1="15" y2="15"/></IconWrapper>;

export const GoogleIcon = (props) => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#4285F4" d="M34.5 18.0001c0-1.2982-.112-2.5855-.327-3.8344H18v7.2691h9.3276c-.3986 2.0673-1.611 3.8647-3.4172 5.0935l6.0886 4.7081c3.5517-3.2685 5.6277-8.1065 5.6277-13.2363z"/>
    <path fill="#34A853" d="M18 36c5.0042 0 9.2291-1.6441 12.3059-4.4795l-6.0886-4.7081c-1.6792 1.1235-3.8304 1.7876-6.2173 1.7876-4.7937 0-8.852-3.14-10.2917-7.4479H1.4745l-0.1017 4.8872c3.0858 6.0963 9.4329 10.1607 16.6272 10.1607z"/>
    <path fill="#FBBC04" d="M7.7083 21.0827c-.2016-.6052-.3179-1.2335-.3179-1.8797s.1163-1.2745.3179-1.8797V11.229H1.5768c-.6896 1.3653-1.0768 2.9109-1.0768 4.5829s.3872 3.2176 1.0768 4.5829l6.1315 4.7431c-.0245-1.1894-.0245-2.404-.0245-3.6264z"/>
    <path fill="#EA4335" d="M18 7.0003c3.4831 0 6.5866 1.1969 9.0357 3.5134l5.3183-5.187C29.2267 1.8341 23.9686 0 18 0c-7.1943 0-13.5414 4.0644-16.6272 10.1607l6.1315 4.7431c1.4397-4.3079 5.5034-7.4479 10.2917-7.4479z"/>
  </svg>
);

export const GitHubIcon = (props) => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387 0.6.111 0.82-.258 0.82-.577 0-0.284-0.011-1.036-0.016-2.039-3.336 0.725-4.04-1.608-4.04-1.608-0.546-1.385-1.332-1.756-1.332-1.756-1.087-0.745 0.082-0.73 0.082-0.73 1.205 0.085 1.838 1.237 1.838 1.237 1.07 1.832 2.809 1.303 3.493 0.997 0.108-0.775 0.418-1.303 0.762-1.603-2.665-0.301-5.464-1.333-5.464-5.942 0-1.312 0.467-2.385 1.237-3.228-0.124-0.301-0.536-1.523 0.117-3.181 0 0 1.008-0.323 3.301 1.235 0.959-0.266 1.984-0.398 3.007-0.403 1.023 0.005 2.049 0.137 3.007 0.403 2.293-1.558 3.3-1.235 3.3-1.235 0.654 1.658 0.242 2.88 0.117 3.181 0.769 0.843 1.236 1.916 1.236 3.228 0 4.622-2.8 5.636-5.474 5.932 0.43 0.372 0.814 1.102 0.814 2.223 0 1.603-0.015 2.899-0.015 3.297 0 0.319 0.219 0.693 0.829 0.575C20.566 22.091 24 17.599 24 12.297 24 5.671 18.627 0.297 12 0.297z"/>
  </svg>
);

