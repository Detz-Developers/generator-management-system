import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9kAZRBSfwkeAP1OGqpAXg5TRuxqqitDk",
  authDomain: "gsmauthen.firebaseapp.com",
  projectId: "gsmauthen",
  storageBucket: "gsmauthen.firebasestorage.app",
  messagingSenderId: "349943624885",
  appId: "1:349943624885:web:758705a06e2307447c3afc"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export default app;
