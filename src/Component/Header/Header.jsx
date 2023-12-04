import React from "react";
import "./Header.scss";
import { FaVideo, FaUserFriends } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
function Header() {
  return (
    <div className="header">
      <h4 className="nameOfFr">Name of fr</h4>
      <div className="call-icon">
        <FaVideo />
        <FaUserFriends />
        <CiCircleMore />
      </div>
    </div>
  );
}

export default Header;
