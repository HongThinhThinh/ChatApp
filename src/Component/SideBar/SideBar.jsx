import React, { useContext } from "react";
import "./SideBar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../AuthContext";
export const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="navbar">
      <span className="logo">Hong Thinh App Chat</span>
      <div className="user">
        <div className="user-info">
          <img src={currentUser.photoURL} alt="" />
          <h5>{currentUser.displayName}</h5>
        </div>
        <button onClick={async () => await signOut(auth)}>Log out</button>
      </div>
    </div>
  );
};
