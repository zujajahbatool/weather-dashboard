import { useState } from "react";
import "./Header.css";
import searchIcon from "../../assets/icons/flowbite_search-outline.png";
import lightThemeIcon from "../../assets/icons/light_theme.png";
import darkThemeIcon from "../../assets/icons/dark_theme.png";

export default function Header({ theme = "dark", onThemeChange, onSearch }) {
  const [query, setQuery] = useState("");

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    onThemeChange?.(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  return (
    <div className="header-bar">
      <form onSubmit={handleSubmit} className="search-pill">
        <button type="submit" className="search-btn" aria-label="Search">
          <img src={searchIcon} alt="search-icon" id="search-icon" />
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search your location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <button
        className="theme-toggle"
        type="button"
        data-theme={theme}
        onClick={handleToggle}
        aria-label="Toggle theme"
      >
        <div className="theme-thumb" />
        <img
          src={lightThemeIcon}
          alt="Light theme"
          className="theme-icon theme-icon--light"
        />
        <img
          src={darkThemeIcon}
          alt="Dark theme"
          className="theme-icon theme-icon--dark"
        />
      </button>
    </div>
  );
}

