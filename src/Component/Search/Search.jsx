import React, { useState } from "react";
import "./Search.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setError] = useState(false);
  // Create a query against the collection.

  const handleSearch = async () => {
    // querry dữ liệu từ db
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
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
    e.code === "Enter" && handleSearch();
  };
  return (
    <div>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find a user"
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        {err && <span>User not found</span>}
        {user && (
          <div className="userChat">
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
