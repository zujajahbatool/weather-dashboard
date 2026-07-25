import { useState } from "react";
import "./Header.css";
import searchIcon from "../../assets/icons/flowbite_search-outline.png";
import lightThemeIcon from "../../assets/icons/light_theme.png";
import darkThemeIcon from "../../assets/icons/dark_theme.png";

export default function Header({ onThemeChange }) {
  const [theme, setTheme] = useState("dark");

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    onThemeChange?.(next);
  };

  return (
    <div className="header-bar">
      <div className="search-pill">
        <img src={searchIcon} alt="search-icon" id="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search your location"
        />
      </div>

      <button
        className="theme-toggle"
        type="button"
        data-theme={theme}
        onClick={handleToggle}
        aria-label="Toggle theme"
      >
        <img
          src={lightThemeIcon}
          alt=""
          className="theme-icon theme-icon--light"
        />
        <div className="theme-track">
          <div className="theme-thumb">
            <img
              src={darkThemeIcon}
              alt=""
              className="theme-icon theme-icon--dark"
            />
          </div>
        </div>
      </button>
    </div>
  );
}
