import React from "react";
import Chat from "../Component/Chat/Chat";
import { SideBar } from "../Component/SideBar/SideBar";
import "./Home.scss";
import AOS from "aos";
import Search from "../Component/Search/Search";
AOS.init();

function Home() {
  return (
    <div className="home">
      <div data-aos="fade-right" className="container">
        <div className="sidebarPage">
          <SideBar />
          <Search />
        </div>
        <div className="navbarPage">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Home;
