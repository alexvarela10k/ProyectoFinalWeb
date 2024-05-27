import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCZU9UqhFjtl-Tg_k_FUaxJqXFIOyTNy0",
  authDomain: "tennis-league-aad22.firebaseapp.com",
  projectId: "tennis-league-aad22",
  storageBucket: "tennis-league-aad22.appspot.com",
  messagingSenderId: "322981969562",
  appId: "1:322981969562:web:98bbfa48a798b34b68e923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication functions
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore and export
export const db = getFirestore(app);
