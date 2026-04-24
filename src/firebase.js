// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SET UP:
//  1. Go to https://console.firebase.google.com/ and create a new project.
//  2. In the project, click "Add app" → Web (</>) and register your app.
//  3. Copy the firebaseConfig object values from Firebase and paste them below.
//  4. In Firebase Console → Authentication → Sign-in method → Enable "Google".
//  5. In Authentication → Settings → Authorized domains, add:
//       - localhost  (already there by default)
//       - your deployed domain (e.g. srujantag.github.io)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// Prompt user to pick a Google account every time
provider.setCustomParameters({ prompt: 'select_account' });

// ── Emails that are treated as admin ────────────────────────────────────────
// Add any email address that should have admin privileges.
export const ADMIN_EMAILS = [
  'admin@admin.com',           // mock admin (email/password login)
  // 'youremail@gmail.com',    // add your real Google email here for admin access
];

export { auth, provider, signInWithPopup, signOut };
