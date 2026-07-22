import "./Header.css";
import searchIcon from "../../assets/icons/flowbite_search-outline.png";
import lightThemeIcon from "../../assets/icons/light_theme.png";
import darkThemeIcon from "../../assets/icons/dark_theme.png";

export default function Header() {
  return (
    <div className="header-bar">
      <div className="search-pill">
        <img
          src={searchIcon}
          alt="search-icon"
          id="search-icon"
        />
        <input
          type="text"
          className="search-input"
          placeholder="Search your location"
        />
      </div>

      <button className="theme-toggle" type="button">
        <img
          src={lightThemeIcon}
          alt="light-theme icon"
          id="light-theme"
        />
        <div className="ellipse">
          <img
          src={darkThemeIcon}
          alt="dark-theme icon"
          id="dark-theme"
        />
        </div>
      </button>
    </div>
  );
}
