import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Header from "./components/Header/Header.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import OtherCountries from "./components/OtherCountries/OtherCountries.jsx";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="app-main">
        <div className="app-topbar">
          <div className="app-greeting-block">
            <div className="name-of-person">Hi, Zujajah</div>
            <div className="app-greeting">Good Morning</div>
          </div>
          <Header />
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-col dashboard-col--left">
            <CurrentWeather />
            <OtherCountries />
          </div>
          <div className="dashboard-col dashboard-col--right">
            {/* Today's Highlight + 5 Day Forecast go here next */}
          </div>
        </div>
      </main>
    </div>
  );
}