import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSc_O02wZ7uAAqG6kzdTKLrLHOE5FVijs",
  authDomain: "karan-de07b.firebaseapp.com",
  projectId: "karan-de07b",
  storageBucket: "karan-de07b.firebasestorage.app",
  messagingSenderId: "229150689879",
  appId: "1:229150689879:web:3a334bf0bf774db1ad3112",
  measurementId: "G-CSJDT7TJT5"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { db };