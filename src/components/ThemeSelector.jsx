import "./ThemeSelector.css";

import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import darkmode from "../assets/darkmode.svg";

function ThemeSelector() {
  const themeColors = ["#58249c", "#249c6b", "#b70233"];
  const { mode, changeColor, changeMode } = useContext(ThemeContext);
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={darkmode}
          onClick={(e) => {
            if (mode === "dark") {
              changeMode("light");
            } else {
              changeMode("dark");
            }
          }}
          style={{
            filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
          }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((themeColor) => (
          <div
            key={themeColor}
            style={{ background: themeColor }}
            onClick={(e) => {
              changeColor(themeColor);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
