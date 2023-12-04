import React from "react";
import Chat from "../Component/Chat/Chat";
import { SideBar } from "../Component/SideBar/SideBar";
import "./Home.scss";
import { Input } from "../Component/Input/Input";
function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="sidebarPage">
          <SideBar />
        </div>
        <div className="navbarPage">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Home;
