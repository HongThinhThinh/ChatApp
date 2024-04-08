// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-QF6taBJ572yyzNb9DmceTBGG8LFp3fE",
  authDomain: "chat-app3-235dd.firebaseapp.com",
  projectId: "chat-app3-235dd",
  storageBucket: "chat-app3-235dd.appspot.com",
  messagingSenderId: "451543850291",
  appId: "1:451543850291:web:594da82677e27ca6c17246",
  measurementId: "G-M3RBTVVS8Y",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
