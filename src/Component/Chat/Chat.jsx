import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Input } from "../Input/Input";
import { Message } from "../Message/Message";
import "./Chat.scss";
import { ChatContext } from "../../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function Chat() {
  const [message, setMessage] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessage(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className="chat">
      <Header />
      <div className="chat-info">
        {message?.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
      <Input className="chat-input" />
    </div>
  );
}

export default Chat;
