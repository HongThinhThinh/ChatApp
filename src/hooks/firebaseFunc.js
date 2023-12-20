import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
const Swal = require("sweetalert2");

export const loginWithGg = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
  } catch (e) {}
};
export const loginWithEmail = async (email, password) => {
  try {
    console.log(email);
    console.log(password);
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "error",
      text: "Invalid Email or Password",
    });
  }
};
