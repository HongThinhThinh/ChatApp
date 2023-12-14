import React, { useContext, useRef, useState } from "react";
import "./Input.scss";
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
  const inputRef = useRef();
  const handleSend = async (imgNew) => {
    let imgUpload;
    if (imgNew) imgUpload = imgNew;
    else imgUpload = img;
    if (imgUpload) {
      let URL = await uploadFile(imgUpload);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: URL,
        }),
      });
      setText("");
      setImg(null);
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setText("");
      setImg(null);
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
  };

  const handleKey = async (e) => {
    e.code === "Enter" && (await handleSend());
  };
  return (
    <div
      className="input"
      style={{ cursor: "pointer" }}
      onClick={() => inputRef.current.focus()}
    >
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
        ref={inputRef}
      />
      <div className="send">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => {
            setImg(e.target.files[0]);
            handleSend(e.target.files[0]);
          }}
        />

        <label htmlFor="file">
          <CiImageOn />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
