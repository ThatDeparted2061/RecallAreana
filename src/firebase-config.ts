/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CLOUD SYNC CONFIG (optional)
 *
 *  Paste your Firebase web-app config object below to enable
 *  "Sign in with Google" + cross-device progress sync.
 *
 *  Full click-by-click setup steps: README.md → "Enable Google sign-in".
 *  Until then the app runs 100% locally (localStorage) — nothing breaks.
 *
 *  Example:
 *
 *  export const firebaseConfig = {
 *    apiKey: "AIzaSy...",
 *    authDomain: "recall-arena.firebaseapp.com",
 *    projectId: "recall-arena",
 *    storageBucket: "recall-arena.firebasestorage.app",
 *    messagingSenderId: "1234567890",
 *    appId: "1:1234567890:web:abc123",
 *  };
 *
 *  (This config is safe to commit — Firebase web configs are public
 *  identifiers; security comes from Firestore rules.)
 * ──────────────────────────────────────────────────────────────────────────
 */
const firebaseConfig = {
  apiKey: "AIzaSyA5yEEmEIHmvBVcHAAMMpepTbdakf9M0VE",
  authDomain: "recall-arena.firebaseapp.com",
  projectId: "recall-arena",
  storageBucket: "recall-arena.firebasestorage.app",
  messagingSenderId: "539075940034",
  appId: "1:539075940034:web:e032506cbf8a658297755b",
  measurementId: "G-NK1LB7H91E"
};
export const firebaseConfig: Record<string, string> | null = null;
