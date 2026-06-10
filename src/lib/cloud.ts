/**
 * Firebase wrapper — everything cloud lives behind CLOUD_ENABLED so the app
 * runs perfectly with no config (local-only mode).
 */
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase-config";
import type { QuestionProgress, QuizAttempt, Streak, Preferences } from "../types";

export type CloudUser = User;

export interface CloudData {
  progress: Record<string, QuestionProgress>;
  history: QuizAttempt[];
  streak: Streak;
  prefs: Preferences;
}

export const CLOUD_ENABLED: boolean = Boolean(
  firebaseConfig && typeof firebaseConfig === "object" && firebaseConfig.apiKey
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

function ensure(): void {
  if (!CLOUD_ENABLED || app) return;
  app = initializeApp(firebaseConfig as Record<string, string>);
  auth = getAuth(app);
  db = getFirestore(app);
}

/** Subscribe to auth state. Returns an unsubscribe fn. */
export function watchAuth(cb: (u: User | null) => void): () => void {
  if (!CLOUD_ENABLED) {
    cb(null);
    return () => {};
  }
  ensure();
  return onAuthStateChanged(auth!, cb);
}

export async function signInGoogle(): Promise<void> {
  ensure();
  if (!auth) throw new Error("Cloud sync is not configured");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider);
}

export async function signOutGoogle(): Promise<void> {
  if (auth) await signOut(auth);
}

/** Map Firebase auth errors to actionable, human messages. */
export function authErrorMessage(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  if (typeof window !== "undefined" && window.location.protocol === "file:") {
    return "Google sign-in can't run from a double-clicked file. Open the app over http(s): run `npm run dev` (http://localhost:5173) or use your deployed URL.";
  }
  switch (code) {
    case "auth/operation-not-allowed":
      return "Google provider is disabled. Firebase console → Authentication → Sign-in method → enable Google.";
    case "auth/unauthorized-domain":
      return `This domain (${window.location.hostname}) isn't authorized. Firebase console → Authentication → Settings → Authorized domains → add it.`;
    case "auth/popup-blocked":
      return "Your browser blocked the popup — allow popups for this site and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Popup closed before finishing — try again.";
    case "auth/configuration-not-found":
      return "Auth isn't set up for this Firebase project. Console → Authentication → Get started, then enable Google.";
    case "auth/network-request-failed":
      return "Network error reaching Google — check your connection.";
    default:
      return `Sign-in failed${code ? ` (${code})` : ""}. Check the browser console for details.`;
  }
}

export async function pullCloud(uid: string): Promise<Partial<CloudData> | null> {
  ensure();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as Partial<CloudData>) : null;
}

export async function pushCloud(uid: string, data: CloudData): Promise<void> {
  ensure();
  if (!db) return;
  await setDoc(
    doc(db, "users", uid),
    { ...data, updatedAt: serverTimestamp() },
    { merge: false }
  );
}
