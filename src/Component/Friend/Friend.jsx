import React, { useContext, useEffect, useState } from "react";
import "../Search/Search.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../AuthContext";
import { ChatContext } from "../../Context/ChatContext";
function Friend() {
  const [chat, setChats] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChat();
  }, [currentUser.uid]);

  console.log(Object.entries(chat));
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <>
      <div className="search">
        {chat &&
          Object.entries(chat)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Friend;
