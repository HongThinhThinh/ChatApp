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
  apiKey: "AIzaSyC9oCJBs6zDZMcJN09jmlmkNEZL5UqPR4c",
  authDomain: "chat-app2-38597.firebaseapp.com",
  projectId: "chat-app2-38597",
  storageBucket: "chat-app2-38597.appspot.com",
  messagingSenderId: "846865138855",
  appId: "1:846865138855:web:d24790a52a24c68ac64782",
  measurementId: "G-NFJ5TFX6VD",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
