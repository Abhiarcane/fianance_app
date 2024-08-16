// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDl7mB4ZVtcMWaguelHpXERs1WGC2qfYi4",
  authDomain: "finance-tracker-90ae6.firebaseapp.com",
  projectId: "finance-tracker-90ae6",
  storageBucket: "finance-tracker-90ae6.appspot.com",
  messagingSenderId: "753458537674",
  appId: "1:753458537674:web:7f4dbbadd0acd46af34033",
  measurementId: "G-QHLXE1438J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };