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
