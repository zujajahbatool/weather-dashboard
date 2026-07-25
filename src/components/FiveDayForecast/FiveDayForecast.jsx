import DayForecastCard from '../DayForecastCard/DayForecastCard';
import './FiveDayForecast.css';

export default function FiveDayForecast({ forecastData = [], unit = "C" }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="fdf-card">
      <h2 className="fdf-title">5 Day Forecast</h2>
      <div className="fdf-row">
        {forecastData.map((item) => (
          <DayForecastCard
            key={item.id}
            day={item.day}
            icon={item.icon}
            iconAlt={item.condition}
            tempMax={item.tempMax}
            tempMin={item.tempMin}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}
