import './DayForecastCard.css';

function DayForecastCard({ day, icon, iconAlt, temp }) {
  return (
    <div className="dfc-card">
      <div className="dfc-day-wrap">
        <span className="dfc-day">{day}</span>
        <div className="dfc-divider" />
      </div>
      <div className="dfc-icon-frame">
        <img src={icon} alt={iconAlt} className="dfc-icon" />
      </div>
      <span className="dfc-temp">{temp}°C</span>
    </div>
  );
}

export default DayForecastCard;