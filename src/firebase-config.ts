/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CLOUD SYNC CONFIG
 *
 *  Firebase web-app config — enables "Sign in with Google" + cross-device
 *  progress sync. Setup steps: README.md → "Enable Google sign-in".
 *
 *  (Safe to commit — Firebase web configs are public identifiers;
 *  security comes from Firestore rules.)
 * ──────────────────────────────────────────────────────────────────────────
 */
export const firebaseConfig: Record<string, string> | null = {
  apiKey: "AIzaSyA5yEEmEIHmvBVcHAAMMpepTbdakf9M0VE",
  authDomain: "recall-arena.firebaseapp.com",
  projectId: "recall-arena",
  storageBucket: "recall-arena.firebasestorage.app",
  messagingSenderId: "539075940034",
  appId: "1:539075940034:web:e032506cbf8a658297755b",
  measurementId: "G-NK1LB7H91E",
};
