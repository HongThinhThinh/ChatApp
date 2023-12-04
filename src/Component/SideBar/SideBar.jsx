import React from "react";
import "./SideBar.scss";
export const SideBar = () => {
  return (
    <div className="navbar">
      <span className="logo">Hong Thinh App Chat</span>
      <div className="user">
        <div className="user-info">
          <img
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt=""
          />
          <h5>Thinh</h5>
        </div>
        <button>Log out</button>
      </div>
    </div>
  );
};
