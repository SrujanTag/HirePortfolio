// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SET UP (one-time, 5 minutes):
//  1. Go to https://console.firebase.google.com/ → Create or open your project.
//  2. Click "Add app" → Web (</>) → Register your app.
//  3. Copy the firebaseConfig object and paste the values below.
//  4. In Firebase Console → Authentication → Sign-in method → Enable "Google".
//  5. In Authentication → Settings → Authorized domains, add:
//       - localhost           (for local dev)
//       - srujantag.github.io (for GitHub Pages — replace with your domain)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQH22e1Wrj8UTdXybr4VHPl84jsuatlGo",
  authDomain: "hireportfolio.firebaseapp.com",
  projectId: "hireportfolio",
  storageBucket: "hireportfolio.firebasestorage.app",
  messagingSenderId: "614206818974",
  appId: "1:614206818974:web:9faa14d2b1b8d1713c498f",
  measurementId: "G-832C3ZETJX"
};

// ── Detect if Firebase is configured ─────────────────────────────────────────
export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('YOUR_');

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// Prompt user to pick a Google account every time
provider.setCustomParameters({ prompt: 'select_account' });

// ── Emails that are treated as admin ────────────────────────────────────────
// Add your real Google email here to get admin access when signing in with Google.
export const ADMIN_EMAILS = [
  'admin@admin.com',             // mock admin (email/password login)
  'srujantagalpallewa@gmail.com',// ← your Google account gets admin privileges
];

export { auth, provider, signInWithPopup, signOut };
