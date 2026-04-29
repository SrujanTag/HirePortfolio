import { useEffect, useRef, useCallback } from 'react';
import { showToast } from '../components/Toast';
const MAX_DEVICES = 2;
const SESSION_KEY = 'hp_active_sessions';
const CHANNEL_NAME = 'hp_session_channel';
const HEARTBEAT_MS = 5000;   
const STALE_MS     = 15000;  
const getSessions = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
  } catch {
    return {};
  }
};
const saveSessions = (sessions) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
};
const pruneStale = (sessions) => {
  const now = Date.now();
  return Object.fromEntries(
    Object.entries(sessions).filter(([, s]) => now - s.lastSeen < STALE_MS)
  );
};
export function useDeviceSession(userEmail, onForceLogout) {
  const sessionIdRef = useRef(`tab_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const channelRef   = useRef(null);
  const heartbeatRef = useRef(null);
  const sessionId    = sessionIdRef.current;
  const getMyKey = useCallback(() => `${userEmail}::${sessionId}`, [userEmail, sessionId]);
  const heartbeat = useCallback(() => {
    if (!userEmail) return;
    const sessions = pruneStale(getSessions());
    sessions[getMyKey()] = { userEmail, sessionId, lastSeen: Date.now() };
    saveSessions(sessions);
  }, [userEmail, getMyKey, sessionId]);
  const checkLimit = useCallback(() => {
    if (!userEmail) return false;
    const sessions = pruneStale(getSessions());
    const mySessions = Object.entries(sessions)
      .filter(([, s]) => s.userEmail === userEmail)
      .sort(([, a], [, b]) => a.lastSeen - b.lastSeen); 
    if (mySessions.length > MAX_DEVICES) {
      const allowedKeys = new Set(mySessions.slice(-MAX_DEVICES).map(([k]) => k));
      if (!allowedKeys.has(getMyKey())) {
        return true; 
      }
    }
    return false;
  }, [userEmail, getMyKey]);
  useEffect(() => {
    if (!userEmail) return;
    heartbeat();
    const sessions = pruneStale(getSessions());
    const userSessions = Object.values(sessions).filter(s => s.userEmail === userEmail);
    if (userSessions.length > MAX_DEVICES) {
      showToast(
        `⚠️ Login limit reached! Only ${MAX_DEVICES} active sessions allowed. This session has been disconnected.`,
        'warning',
        0 
      );
      const all = getSessions();
      delete all[getMyKey()];
      saveSessions(all);
      onForceLogout?.();
      return;
    }
    heartbeatRef.current = setInterval(heartbeat, HEARTBEAT_MS);
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;
      channel.addEventListener('message', (e) => {
        if (e.data?.type === 'SESSION_CHECK' && e.data.userEmail === userEmail) {
          heartbeat(); 
        }
        if (e.data?.type === 'FORCE_LOGOUT' && e.data.sessionId === sessionId) {
          showToast('You were logged out because too many devices are connected.', 'error', 0);
          onForceLogout?.();
        }
      });
      channel.postMessage({ type: 'SESSION_CHECK', userEmail });
    } catch {
    }
    return () => {
      clearInterval(heartbeatRef.current);
      const all = pruneStale(getSessions());
      delete all[getMyKey()];
      saveSessions(all);
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, [userEmail]);
  return { checkLimit };
}
