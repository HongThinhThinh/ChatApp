import React from "react";
import Header from "../Header/Header";
import { Input } from "../Input/Input";
import { Message } from "../Message/Message";
import "./Chat.scss";
function Chat() {
  return (
    <div className="chat">
      <Header />
      <div className="chat-info">
        <Message />
      </div>
      <Input className="chat-input" />
    </div>
  );
}

export default Chat;
