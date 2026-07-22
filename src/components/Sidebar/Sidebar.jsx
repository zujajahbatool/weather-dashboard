import "./Sidebar.css";
import menuIcon from "../../assets/icons/menu.png";
import dashboardIcon from "../../assets/icons/dashboard.png";
import notificationIcon from "../../assets/icons/notification_line.png";
import settingsIcon from "../../assets/icons/setting.png";
import helpIcon from "../../assets/icons/help.png";

function Sidebar() {
  return (
    <nav className="sidebar">
      <button className="sidebar-icon sidebar-menu" aria-label="Menu">
        <img src={menuIcon} alt="hamburger icon" />
      </button>

      <div className="sidebar-nav">
        <button className="sidebar-icon sidebar-icon--active" aria-label="Dashboard">
          <img src={dashboardIcon} alt="dashboard icon" />
        </button>
        <button className="sidebar-icon" aria-label="Notifications">
          <img src={notificationIcon} alt="notifications icon" />
        </button>
        <button className="sidebar-icon" aria-label="Settings">
          <img src={settingsIcon} alt="settings icon" />
        </button>
      </div>

      <button className="sidebar-icon sidebar-icon--bottom" aria-label="Help">
        <img src={helpIcon} alt="find help icon" />
      </button>
    </nav>
  );
}

export default Sidebar;