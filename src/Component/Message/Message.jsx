import React, { useContext, useEffect, useRef } from "react";
import "./Message.scss";
import { AuthContext } from "../../AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import ImgPreview from "../Image/Image";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      {(message.text || message.img) && (
        <div
          ref={ref}
          className={`message ${
            message.senderId === currentUser.uid && "owner"
          }`}
        >
          <div className="messageInfo">
            <img
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
            {/* <span>just now</span> */}
          </div>
          <div className="messageContent">
            {message.text && <p>{message.text}</p>}
            {message.img && (
              <div className="msg_img">
                <ImgPreview src={message.img} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
