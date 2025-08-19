import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBETCShHXU8nKWpuW82I7cm2QKuZC92F5A",
  authDomain: "phuket-16eb4.firebaseapp.com",
  projectId: "phuket-16eb4",
  storageBucket: "phuket-16eb4.firebasestorage.app",
  messagingSenderId: "1018211404744",
  appId: "1:1018211404744:web:59e84d3da35f18ce2c671d",
  measurementId: "G-6M7Z86TB6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Helper function to check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY";
};
