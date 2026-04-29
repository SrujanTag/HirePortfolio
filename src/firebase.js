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
export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('YOUR_');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
export const ADMIN_EMAILS = ['admin@admin.com', 'srujantagalpallewa@gmail.com'];
export { auth, provider, signInWithPopup, signOut };