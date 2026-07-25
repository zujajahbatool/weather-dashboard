import './DayForecastCard.css';

export default function DayForecastCard({ day, icon, iconAlt, tempMax, tempMin, unit = "C" }) {
  return (
    <div className="dfc-card">
      <div className="dfc-day-wrap">
        <span className="dfc-day">{day}</span>
        <div className="dfc-divider" />
      </div>
      <div className="dfc-icon-frame">
        <img src={icon} alt={iconAlt} className="dfc-icon" />
      </div>
      <span className="dfc-temp" style={{ fontSize: '14px', textAlign: 'center' }}>
        {Math.round(tempMax)}&deg;/{Math.round(tempMin)}&deg;{unit}
      </span>
    </div>
  );
}
