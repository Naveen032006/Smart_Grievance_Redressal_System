import React from "react";
import Color from "./Color";
import { Link } from "react-router-dom";

function Hnav() {
  const liStyle = {
    textAlign: "center",
    margin: "50px",
    fontSize: "150%",
    textDecoration: "none",
    color: Color.secondary,
  };
  return (
    <ul id="ulist" style={{ color: Color.secondary }}>
      <li>
        <Link to="/" style={liStyle}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/Ward-Details" style={liStyle}>
          Ward Details
        </Link>
      </li>
      <li>
        <Link to="/Contacts" style={liStyle}>
          Contacts
        </Link>
      </li>
    </ul>
  );
}

export default Hnav;
