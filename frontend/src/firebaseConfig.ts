import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} as const;

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let secondaryApp: FirebaseApp | null = null;

export const auth = getAuth(app);
export const db = getDatabase(app);
export const functions = getFunctions(app, process.env.NEXT_PUBLIC_FIREBASE_REGION ?? "us-central1");

export const getSecondaryAuth = (): Auth => {
  if (!secondaryApp) {
    secondaryApp = initializeApp(firebaseConfig, "secondary");
  }
  return getAuth(secondaryApp);
};

export default app;