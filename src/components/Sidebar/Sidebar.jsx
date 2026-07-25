import { useState } from "react";
import "./Sidebar.css";
import menuIcon from "../../assets/icons/menu.png";
import dashboardIcon from "../../assets/icons/dashboard.png";
import notificationIcon from "../../assets/icons/notification_line.png";
import settingsIcon from "../../assets/icons/setting.png";
import helpIcon from "../../assets/icons/help.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((currentValue) => !currentValue);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`sidebar-trigger ${isOpen ? "is-hidden" : ""}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={toggleSidebar}
      >
        <img src={menuIcon} alt="hamburger icon" />
      </button>

      <div
        className={`sidebar-backdrop ${isOpen ? "is-visible" : ""}`}
        onClick={closeSidebar}
      />

      <nav
        className={`sidebar ${isOpen ? "is-open" : ""}`}
        aria-label="Sidebar navigation"
      >
        <div className="sidebar-top">
          <button
            className="sidebar-icon sidebar-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={toggleSidebar}
          >
            <img src={menuIcon} alt="hamburger icon" />
          </button>
          <div className="sidebar-divider sidebar-divider--top"></div>
        </div>

        <div className="sidebar-nav">
          <button
            className="sidebar-icon sidebar-icon--active"
            aria-label="Dashboard"
          >
            <img src={dashboardIcon} alt="dashboard icon" />
          </button>
          <button className="sidebar-icon" aria-label="Notifications">
            <img src={notificationIcon} alt="notifications icon" />
          </button>
          <button className="sidebar-icon" aria-label="Settings">
            <img src={settingsIcon} alt="settings icon" />
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-divider sidebar-divider--bottom"></div>
          <button className="sidebar-icon sidebar-icon--bottom" aria-label="Help">
            <img src={helpIcon} alt="find help icon" />
          </button>
        </div>
      </nav>
    </>
  );
}
