// 🔥 Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5bDeZZnN8fr_ziHjLUJrXjGYSXKhBrT8",
  authDomain: "donation-cloud.firebaseapp.com",
  projectId: "donation-cloud",
  storageBucket: "donation-cloud.firebasestorage.app",
  messagingSenderId: "548445250986",
  appId: "1:548445250986:web:ad416b030ca2aa496df7d3",
  measurementId: "G-VYK7EXQC96"
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore Database
export const db = getFirestore(app);
