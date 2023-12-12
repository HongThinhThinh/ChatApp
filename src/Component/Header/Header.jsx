import React, { useContext } from "react";
import "./Header.scss";
import { FaVideo, FaUserFriends } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { ChatContext } from "../../Context/ChatContext";
function Header() {
  const { data } = useContext(ChatContext);
  return (
    <div className="header">
      <h4 className="nameOfFr">{data.user?.displayName}</h4>
      <div className="call-icon">
        <FaVideo />
        <FaUserFriends />
        <CiCircleMore />
      </div>
    </div>
  );
}

export default Header;
