import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import React from "react";
import Searchbar from "./Searchbar";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
function Navbar() {
  const { color, changeColor } = useContext(ThemeContext);
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: color,
      }}
    >
      <nav>
        <Link className="brand" to="/">
          <h1>Recipe-Hunt</h1>
        </Link>
        {/* <Searchbar /> */}
        <Link to="/create">create Recipe</Link>
      </nav>
    </div>
  );
}

export default Navbar;
