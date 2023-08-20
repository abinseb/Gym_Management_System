// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN624cxEDoRA_FEKaNMn8b18dAzhLjEg0",
  authDomain: "gymmanagement-924ea.firebaseapp.com",
  projectId: "gymmanagement-924ea",
  storageBucket: "gymmanagement-924ea.appspot.com",
  messagingSenderId: "798524453472",
  appId: "1:798524453472:web:2c08f11c870d3dbb314905",
  measurementId: "G-EESZCD9S07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };