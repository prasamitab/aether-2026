// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCGaXLbEi_0DM0QE6HeGXeZSOrNq7-dSU",
  authDomain: "aether-59aeb.firebaseapp.com",
  projectId: "aether-59aeb",
  storageBucket: "aether-59aeb.firebasestorage.app",
  messagingSenderId: "722685519644",
  appId: "1:722685519644:web:db56c6947c4ff123a1fcd9",
  measurementId: "G-XS8D2VD92T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);