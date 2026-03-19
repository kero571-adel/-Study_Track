// Firebase configuration file
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration - قم بتغيير هذه القيم ببيانات مشروعك على Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// تسجيل البيانات للتحقق من أنها تُحمّل بشكل صحيح
console.log("🔥 Firebase Config Status:", {
  apiKey: firebaseConfig.apiKey ? "✓ Loaded" : "✗ MISSING - CHECK .env FILE",
  authDomain: firebaseConfig.authDomain ? "✓ Loaded" : "✗ Missing",
  projectId: firebaseConfig.projectId ? "✓ Loaded" : "✗ Missing",
  storageBucket: firebaseConfig.storageBucket ? "✓ Loaded" : "✗ Missing",
  messagingSenderId: firebaseConfig.messagingSenderId
    ? "✓ Loaded"
    : "✗ Missing",
  appId: firebaseConfig.appId ? "✓ Loaded" : "✗ Missing",
});

// تحقق من وجود جميع البيانات المطلوبة
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    "❌ Firebase Config Error: Missing required environment variables in .env file"
  );
  console.error("Make sure your .env file has:", {
    REACT_APP_FIREBASE_API_KEY: "needed",
    REACT_APP_FIREBASE_AUTH_DOMAIN: "needed",
    REACT_APP_FIREBASE_PROJECT_ID: "needed",
    REACT_APP_FIREBASE_STORAGE_BUCKET: "needed",
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "needed",
    REACT_APP_FIREBASE_APP_ID: "needed",
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Enable offline persistence - حتى يتذكر المستخدم حتى بعد إغلاق المتصفح
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.warn("Failed to enable persistence:", error);
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;
