import React from "react";
import "./Input.scss";
import { IoMdAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
export const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type Something..." />
      <div className="send">
        <CiImageOn />
        <input style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <IoMdAttach />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};
