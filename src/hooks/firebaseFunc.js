import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const Swal = require("sweetalert2");

export const loginWithGg = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    await createUserChat(
      res,
      res.user.displayName,
      res.user.email,
      res.user.photoURL
    );
  } catch (e) {
    console.log(e);
  }
};
export const loginWithEmail = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "error",
      text: `${e.message}`,
    });
  }
};

export const createUserChat = async (res, displayName, email, URL) => {
  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    displayName,
    email,
    photoURL: URL,
  });
  // chat của mỗi user, ban đầu là object trống nhưng khi nhắn tin với ai sẽ update
  await setDoc(doc(db, "userChat", res.user.uid), {});
  Swal.fire({
    title: "Good job!",
    text: "SignUp SuccessFully",
    icon: "success",
  });
};
