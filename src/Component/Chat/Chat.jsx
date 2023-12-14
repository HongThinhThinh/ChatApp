import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Input } from "../Input/Input";
import { Message } from "../Message/Message";
import "./Chat.scss";
import { ChatContext } from "../../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { IoMdChatboxes } from "react-icons/io";
function Chat() {
  const [message, setMessage] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    console.log(data.chatId);
    if (data.chatId != null) {
      console.log("re-render");
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessage(doc.data().messages);
      });
      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  console.log(data);

  return (
    <div className="chat">
      {data?.chatId ? (
        // Nếu có chatId thì hiển thị những thứ bên trong
        <>
          <Header />
          <div className="chat-info">
            {message?.map((m) => (
              <Message message={m} key={m.id} />
            ))}
          </div>
          <Input />
        </>
      ) : (
        // Ngược lại hiển thị thông báo khác
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <p>
            Please select a friend to start chat <IoMdChatboxes />
          </p>
        </div>
      )}
    </div>
  );
}

export default Chat;
