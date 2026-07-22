import "./Header.css";

export default function Header() {
  return (
    <div className="header-bar">
      <div className="search-pill">
        <img
          src="src\assets\icons\flowbite_search-outline.png"
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
          src="src\assets\icons\light_theme.png"
          alt="light-theme icon"
          id="light-theme"
        />
        <div className="ellipse">
          <img
          src="src\assets\icons\dark_theme.png"
          alt="dark-theme icon"
          id="dark-theme"
        />
        </div>
      </button>
    </div>
  );
}
