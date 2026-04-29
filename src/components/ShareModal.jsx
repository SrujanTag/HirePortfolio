import React, { useState } from 'react';
const ShareModal = ({ member, onClose }) => {
  const [copied, setCopied] = useState(false);
  const pageUrl = encodeURIComponent(
    `${window.location.origin}${window.location.pathname}#profile-${member?.id}`
  );
  const shareText = encodeURIComponent(
    `Check out ${member?.name} — ${member?.role} on HirePortfolio! 🚀`
  );
  const links = [
    {
      label: 'Twitter / X',
      icon: '🐦',
      color: 'hover:bg-sky-900/40 hover:border-sky-500/40 hover:text-sky-300',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      color: 'hover:bg-blue-900/40 hover:border-blue-500/40 hover:text-blue-300',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      color: 'hover:bg-green-900/40 hover:border-green-500/40 hover:text-green-300',
      href: `https://wa.me/?text=${shareText}%20${pageUrl}`,
    },
    {
      label: 'Facebook',
      icon: '📘',
      color: 'hover:bg-indigo-900/40 hover:border-indigo-500/40 hover:text-indigo-300',
      href: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    },
  ];
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decodeURIComponent(pageUrl));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = decodeURIComponent(pageUrl);
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${member?.name} — HirePortfolio`,
        text: `Check out ${member?.name}'s profile on HirePortfolio!`,
        url: decodeURIComponent(pageUrl),
      }).catch(() => {});
    }
  };
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#0F1117] border border-[#1F232C] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-lg">Share Profile</h3>
            <p className="text-gray-500 text-sm mt-0.5">
              Share <span className="text-gray-300">{member?.name}</span>'s profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-3 rounded-xl border border-[#2F333A] bg-[#161922] text-gray-400 text-sm font-medium transition-all ${link.color}`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-[#161922] border border-[#2F333A] rounded-xl px-3 py-2.5 mb-3">
          <span className="text-gray-500 text-xs truncate flex-1">
            {decodeURIComponent(pageUrl).replace(/^https?:\/\//, '')}
          </span>
          <button
            onClick={handleCopy}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl border border-[#2F333A] bg-[#161922] text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
          >
            📤 Share via device
          </button>
        )}
      </div>
    </div>
  );
};
export default ShareModal;
