import React from "react";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const ButtonOut = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <span>
        <span style={{ opacity: "0.9" }}> Dont have any account ?</span>
        <Link to={"/register"}> Register Here</Link>
      </span>
    </div>
  );
};
