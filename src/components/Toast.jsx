import React, { useEffect, useState } from 'react';
export const ToastContext = React.createContext(null);
let _addToast = null;
export function showToast(message, type = 'info', duration = 4000) {
  if (_addToast) _addToast(message, type, duration);
}
function ToastItem({ id, message, type, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(id), 300);
  };
  const colors = {
    success: 'bg-emerald-900/90 border-emerald-500/40 text-emerald-200',
    error:   'bg-red-900/90 border-red-500/40 text-red-200',
    warning: 'bg-yellow-900/90 border-yellow-500/40 text-yellow-200',
    info:    'bg-blue-900/90 border-blue-500/40 text-blue-200',
  };
  const icons = {
    success: '✅',
    error:   '❌',
    warning: '⚠️',
    info:    'ℹ️',
  };
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-sm max-w-sm w-full
        ${colors[type] || colors.info}
        transition-all duration-300
        ${exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
    >
      <span className="text-base mt-0.5 shrink-0">{icons[type] || icons.info}</span>
      <p className="text-sm flex-1 leading-snug">{message}</p>
      <button
        onClick={handleRemove}
        className="shrink-0 text-current opacity-50 hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };
  useEffect(() => {
    _addToast = addToast;
    return () => { _addToast = null; };
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem id={t.id} message={t.message} type={t.type} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
