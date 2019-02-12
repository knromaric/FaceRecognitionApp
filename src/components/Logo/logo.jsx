import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 140, width: 140 }}
      >
        <div className="Tilt-inner pa-3">
          <img style={{ paddingTop: "35px" }} src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
