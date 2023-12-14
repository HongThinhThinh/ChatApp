import React, { useContext, useRef, useState } from "react";
import "./Search.scss";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../AuthContext";
function Search() {
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef();
  // Create a query against the collection.
  const handleSearch = async (name) => {
    // querry dữ liệu từ db
    const q = query(collection(db, "users"), where("displayName", "==", name));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (e) {
      setError(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch(userName);
  };
  const handleSelect = async () => {
    // check whether the group exist or not in firestore
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        //create user chats
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUserName(null);
  };

  return (
    <div>
      <div className="search">
        <div
          className="searchForm"
          style={{ cursor: "pointer" }}
          onClick={() => inputRef.current.focus()}
        >
          <input
            ref={inputRef}
            onInput={(e) => {}}
            type="text"
            placeholder="Find a user"
            onChange={(e) => {
              setUserName(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={handleKey}
          />
        </div>
        {err && <span>User not found</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
