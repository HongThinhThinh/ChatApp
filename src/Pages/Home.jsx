import React, { useEffect, useState } from "react";
import Chat from "../Component/Chat/Chat";
import { SideBar } from "../Component/SideBar/SideBar";
import "./Home.scss";
import AOS from "aos";
import Search from "../Component/Search/Search";
import Friend from "../Component/Friend/Friend";
import { useMediaQuery } from "react-responsive";
import { FaArrowLeftLong } from "react-icons/fa6";

AOS.init();
function Home() {
  const [showNavbar, setshowNavbar] = useState(false);
  const [showSideBar, setshowSideBar] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  const handleShowsideBar = () => {
    setshowNavbar(true);
    setshowSideBar(false);
  };
  const handleShowNavbar = () => {
    setshowNavbar(false);
    setshowSideBar(true);
  };

  useEffect(() => {
    if (!isMobile) {
      setshowNavbar(true);
      setshowSideBar(true);
    } else {
      setshowNavbar(false);
    }
  }, [isMobile]);
  return (
    <div className="home">
      <div data-aos="fade-right" className="container">
        {showSideBar && (
          <div className="sidebarPage">
            <SideBar />
            <Search />
            <div onClick={isMobile ? handleShowsideBar : undefined}>
              <Friend />
            </div>
          </div>
        )}
        {showNavbar && (
          <>
            <div className="navbarPage">
              <div className="back" onClick={handleShowNavbar}>
                <FaArrowLeftLong />
              </div>
              <Chat />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
