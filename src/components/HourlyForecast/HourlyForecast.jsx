import "./HourlyForecast.css";

export default function HourlyForecast({ hourlyData = [], unit = "C" }) {
  if (!hourlyData || hourlyData.length === 0) return null;

  return (
    <div className="hf-card">
      <h2 className="hf-title">Hourly Forecast (Next 24h)</h2>
      <div className="hf-row">
        {hourlyData.map((item, idx) => (
          <div className="hfc-card" key={idx}>
            <span className="hfc-time">{item.time}</span>
            <div className="hfc-divider" />
            <div className="hfc-icon-frame">
              <img src={item.icon} alt={item.condition} className="hfc-icon" />
            </div>
            <span className="hfc-temp">
              {Math.round(item.temp)}&deg;{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
