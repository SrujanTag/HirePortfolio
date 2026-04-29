import React, { useState, useRef, useEffect } from 'react';

// ── Bot Brain ────────────────────────────────────────────────────────────────
const GREETINGS = ['hi', 'hello', 'hey', 'hola', 'sup', 'yo'];
const HELP_KEYWORDS = ['help', 'what can you do', 'commands', 'options'];
const HIRE_KEYWORDS = ['hire', 'enquire', 'enquiry', 'job', 'recruit', 'work with', 'team'];
const CONTACT_KEYWORDS = ['contact', 'email', 'reach', 'touch', 'mail'];
const TEAM_KEYWORDS = ['team', 'member', 'who', 'list', 'all', 'everyone', 'people'];


function botReply(input, users, onNavigate) {
  const q = input.toLowerCase().trim();

  // Greeting
  if (GREETINGS.some(g => q === g || q.startsWith(g + ' '))) {
    return {
      text: "Hey there! 👋 I'm LeapBot, your HirePortfolio assistant. I can help you:\n\n• Find talent by skill or role\n• Browse the team\n• Connect with members\n\nJust ask me anything!",
      actions: [],
    };
  }

  // Help
  if (HELP_KEYWORDS.some(k => q.includes(k))) {
    return {
      text: "Here's what I can do 🤖\n\n• **Find by skill** — type a skill like \"React\" or \"Python\"\n• **Find by role** — \"frontend developer\" or \"designer\"\n• **Team list** — \"show team\"\n• **Hire someone** — \"hire [name]\"\n• **Contact info** — \"contact\"",
      actions: [],
    };
  }

  // Contact
  if (CONTACT_KEYWORDS.some(k => q.includes(k))) {
    return {
      text: "You can reach the team via:\n\n📧 team@hireportfolio.dev\n🐙 github.com/SrujanTag\n💼 linkedin.com/company/devleopards\n\nOr click \"View Profile\" on any card to see their direct links!",
      actions: [{ label: '📂 Browse Portfolio', action: () => onNavigate('portfolio') }],
    };
  }

  // Team list
  if (TEAM_KEYWORDS.some(k => q.includes(k))) {
    const list = users.map(u => `• ${u.name} — ${u.role}`).join('\n');
    return {
      text: `We have ${users.length} awesome team members:\n\n${list}`,
      actions: [{ label: '📂 Open Portfolio', action: () => onNavigate('portfolio') }],
    };
  }

  // Hire by name
  if (HIRE_KEYWORDS.some(k => q.includes(k))) {
    const matched = users.filter(u =>
      u.name.toLowerCase().split(' ').some(part => q.includes(part))
    );
    if (matched.length > 0) {
      const person = matched[0];
      return {
        text: `Great choice! ${person.name} is a ${person.role}. Click below to send a hire inquiry:`,
        actions: [
          { label: `💼 Hire ${person.name.split(' ')[0]}`, action: () => onNavigate('hire', person) },
          { label: '📂 View Profile', action: () => onNavigate('profile', person) },
        ],
      };
    }
    return {
      text: "I'd love to help you hire! Tell me the name or role you're looking for. For example: \"hire a React developer\" or \"hire Kartikey\".",
      actions: [{ label: '💼 Go to Hire Page', action: () => onNavigate('hire') }],
    };
  }

  // Skill match
  const skillMatch = users.filter(u => {
    const allSkills = [
      ...(u.skills?.frontend || []),
      ...(u.skills?.backend  || []),
      ...(u.skills?.tools    || []),
    ].map(s => s.toLowerCase());
    return allSkills.some(s => q.includes(s) || s.includes(q.split(' ').find(w => w.length > 2) || ''));
  });

  if (skillMatch.length > 0) {
    const names = skillMatch.map(u => `• ${u.name} (${u.role})`).join('\n');
    return {
      text: `Found ${skillMatch.length} member(s) with matching skills:\n\n${names}`,
      actions: [
        { label: '📂 View Portfolio', action: () => onNavigate('portfolio') },
        ...(skillMatch.length === 1 ? [{ label: `💼 Hire ${skillMatch[0].name.split(' ')[0]}`, action: () => onNavigate('hire', skillMatch[0]) }] : []),
      ],
    };
  }

  // Role match
  const roleMatch = users.filter(u => {
    const words = q.split(' ').filter(w => w.length > 3);
    return words.some(w => u.role.toLowerCase().includes(w));
  });

  if (roleMatch.length > 0) {
    const names = roleMatch.map(u => `• ${u.name} — ${u.role}`).join('\n');
    return {
      text: `Here are team members matching your query:\n\n${names}\n\nWould you like to hire one of them?`,
      actions: [{ label: '📂 Open Portfolio', action: () => onNavigate('portfolio') }],
    };
  }

  // Fallback
  return {
    text: "Hmm, I'm not sure about that 🤔 Try asking me:\n\n• \"Show me React developers\"\n• \"Who is available?\"\n• \"Hire a designer\"\n• \"Contact the team\"",
    actions: [],
  };
}

// ── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ───────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.sender === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-0.5">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] ${isBot
          ? 'bg-[#1C1F26] border border-[#2F333A] text-gray-200 rounded-2xl rounded-tl-sm'
          : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
        } px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap`}
      >
        {msg.text}
        {/* Action buttons */}
        {msg.actions?.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-3">
            {msg.actions.map((a, i) => (
              <button
                key={i}
                onClick={a.action}
                className="w-full text-left px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-xs font-medium transition-colors"
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Quick Replies ─────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  '👥 Show team',
  '💼 Hire talent',
  '⚡ React devs',
  '✉️ Contact',
];

// ── Main ChatBot ─────────────────────────────────────────────────────────────
const ChatBot = ({ users = [], onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm LeapBot 🤖 Your HirePortfolio assistant. How can I help you today?",
      actions: [],
    },
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [unread, setUnread]   = useState(0);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const pushMessage = (msg) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), ...msg }]);
  };

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    pushMessage({ sender: 'user', text: trimmed, actions: [] });
    setInput('');
    setTyping(true);

    const DELAY = 600 + Math.random() * 600; // human-like 0.6–1.2s
    setTimeout(() => {
      setTyping(false);
      const reply = botReply(trimmed, users, (page, person) => {
        setOpen(false);
        if (page === 'hire') onNavigate?.('hire', person);
        else if (page === 'profile') onNavigate?.('profile', person);
        else onNavigate?.(page);
      });
      pushMessage({ sender: 'bot', ...reply });
      if (!open) setUnread(n => n + 1);
    }, DELAY);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-[9990] w-80 sm:w-96 flex flex-col
          bg-[#0F1117] border border-[#1F232C] rounded-2xl shadow-2xl
          transition-all duration-300 origin-bottom-right
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}
        style={{ maxHeight: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F232C] bg-gradient-to-r from-blue-900/30 to-purple-900/20 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm">
              🤖
            </div>
            <div>
              <p className="text-white font-bold text-sm">LeapBot</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[10px]">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-white text-xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ minHeight: 0 }}>
          {messages.map(msg => (
            <Bubble key={msg.id} msg={msg} />
          ))}
          {typing && (
            <div className="flex justify-start mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-0.5">🤖</div>
              <div className="bg-[#1C1F26] border border-[#2F333A] rounded-2xl rounded-tl-sm">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="flex gap-1.5 px-4 pb-2 flex-wrap">
          {QUICK_REPLIES.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q.replace(/^[^\s]+ /, ''))}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#1C1F26] border border-[#2F333A] text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1F232C]">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#161922] border border-[#2F333A] rounded-xl px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/50 transition-colors"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 flex items-center justify-center text-white transition-all shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 z-[9991] w-14 h-14 rounded-full shadow-2xl
          flex items-center justify-center text-2xl
          bg-gradient-to-br from-blue-600 to-purple-600
          hover:from-blue-500 hover:to-purple-500
          transition-all duration-300
          ${open ? 'rotate-0 scale-95' : 'rotate-0 scale-100 hover:scale-110'}`}
        title="Chat with LeapBot"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span>💬</span>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unread}
          </span>
        )}
      </button>
    </>
  );
};

export default ChatBot;
