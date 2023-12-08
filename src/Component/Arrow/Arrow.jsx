import { FaArrowLeftLong } from "react-icons/fa6";
import React from "react";
import { useNavigate } from "react-router";

function Arrow() {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate("/login")}>
        <FaArrowLeftLong />
      </div>
    </>
  );
}

export default Arrow;
