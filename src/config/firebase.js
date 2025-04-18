import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCvxwmyx8CksmIBrsDEdvKO8jWvWqgcaYE",
  authDomain: "avenus-b12c3.firebaseapp.com",
  projectId: "avenus-b12c3",
  storageBucket: "avenus-b12c3.firebasestorage.app",
  messagingSenderId: "548739805166",
  appId: "1:548739805166:web:0b6e0ab5542e501e98e8ff",
  measurementId:"G-1Q4KLZG15S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
