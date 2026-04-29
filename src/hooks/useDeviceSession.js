import { useEffect, useRef, useCallback } from 'react';
import { showToast } from '../components/Toast';

// ── Config ───────────────────────────────────────────────────────────────────
const MAX_DEVICES = 2;
const SESSION_KEY = 'hp_active_sessions';
const CHANNEL_NAME = 'hp_session_channel';
const HEARTBEAT_MS = 5000;   // send alive ping every 5s
const STALE_MS     = 15000;  // session older than 15s is considered dead

// ── Helpers ──────────────────────────────────────────────────────────────────
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

// ── Hook ─────────────────────────────────────────────────────────────────────
/**
 * useDeviceSession(userEmail)
 *
 * Call this after a user logs in. Pass null/undefined when logged out.
 * - Registers the current tab as a session for this user.
 * - Blocks if MAX_DEVICES already active for that user.
 * - Returns { blocked: bool } so the caller can show a blocking screen.
 */
export function useDeviceSession(userEmail, onForceLogout) {
  const sessionIdRef = useRef(`tab_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const channelRef   = useRef(null);
  const heartbeatRef = useRef(null);
  const sessionId    = sessionIdRef.current;

  const getMyKey = useCallback(() => `${userEmail}::${sessionId}`, [userEmail, sessionId]);

  // Register / update this tab's heartbeat
  const heartbeat = useCallback(() => {
    if (!userEmail) return;
    const sessions = pruneStale(getSessions());
    sessions[getMyKey()] = { userEmail, sessionId, lastSeen: Date.now() };
    saveSessions(sessions);
  }, [userEmail, getMyKey, sessionId]);

  // Check if we exceed the limit
  const checkLimit = useCallback(() => {
    if (!userEmail) return false;
    const sessions = pruneStale(getSessions());
    const mySessions = Object.entries(sessions)
      .filter(([, s]) => s.userEmail === userEmail)
      .sort(([, a], [, b]) => a.lastSeen - b.lastSeen); // oldest first

    if (mySessions.length > MAX_DEVICES) {
      // Check if this tab is one of the allowed slots
      const allowedKeys = new Set(mySessions.slice(-MAX_DEVICES).map(([k]) => k));
      if (!allowedKeys.has(getMyKey())) {
        return true; // this tab is over limit
      }
    }
    return false;
  }, [userEmail, getMyKey]);

  useEffect(() => {
    if (!userEmail) return;

    // 1. Do an initial heartbeat to register
    heartbeat();

    // 2. Check if we're already over limit right after registering
    const sessions = pruneStale(getSessions());
    const userSessions = Object.values(sessions).filter(s => s.userEmail === userEmail);

    if (userSessions.length > MAX_DEVICES) {
      showToast(
        `⚠️ Login limit reached! Only ${MAX_DEVICES} active sessions allowed. This session has been disconnected.`,
        'warning',
        0 // persistent
      );
      // Remove this tab's session and log out
      const all = getSessions();
      delete all[getMyKey()];
      saveSessions(all);
      onForceLogout?.();
      return;
    }

    // 3. Start heartbeat interval
    heartbeatRef.current = setInterval(heartbeat, HEARTBEAT_MS);

    // 4. BroadcastChannel — listen for session events from other tabs
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.addEventListener('message', (e) => {
        if (e.data?.type === 'SESSION_CHECK' && e.data.userEmail === userEmail) {
          heartbeat(); // respond with a fresh ping
        }
        if (e.data?.type === 'FORCE_LOGOUT' && e.data.sessionId === sessionId) {
          showToast('You were logged out because too many devices are connected.', 'error', 0);
          onForceLogout?.();
        }
      });

      // Tell other tabs we just joined
      channel.postMessage({ type: 'SESSION_CHECK', userEmail });
    } catch {
      // BroadcastChannel not available (old browsers) — fallback: rely on heartbeat only
    }

    return () => {
      // Cleanup: remove this session on unmount/logout
      clearInterval(heartbeatRef.current);
      const all = pruneStale(getSessions());
      delete all[getMyKey()];
      saveSessions(all);
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  return { checkLimit };
}
