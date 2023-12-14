import React, { useContext } from "react";
import "./Header.scss";
import { FaVideo, FaUserFriends } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { ChatContext } from "../../Context/ChatContext";
import { FaArrowLeftLong } from "react-icons/fa6";

function Header() {
  const { data } = useContext(ChatContext);
  return (
    <div className="header">
      <div className="backk">
        <FaArrowLeftLong />
      </div>
      <h4 className="nameOfFr">{data.chatId ? data.user.displayName : "cc"}</h4>
      <div className="call-icon">
        <FaVideo />
        <FaUserFriends />
        <CiCircleMore />
      </div>
    </div>
  );
}

export default Header;
