// Firebase Configuration
// Replace with your Firebase project credentials

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// Get this from: Firebase Console → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: "AIzaSyDom7WdUx2-5wMTu5T1UoBJ1wvWJwsRZM4",
  authDomain: "financas-pessoais-f3413.firebaseapp.com",
  projectId: "financas-pessoais-f3413",
  storageBucket: "financas-pessoais-f3413.firebasestorage.app",
  messagingSenderId: "891664855211",
  appId: "1:891664855211:web:870617ecb9c1a418ff47ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support offline persistence');
  }
});

export default app;
