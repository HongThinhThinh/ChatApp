import React, { useContext, useState } from "react";
import "./Input.scss";
import { IoMdAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import uploadFile from "../../hooks/useUpload";
export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      let URL = await uploadFile(img);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: URL,
        }),
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file">
          <CiImageOn />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
