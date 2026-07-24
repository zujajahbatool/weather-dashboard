import DayForecastCard from '../DayForecastCard/DayForecastCard';
import rainyIcon from '../../assets/icons/rainy_icon.png';
import partlySunnyIcon from '../../assets/icons/partlysunny_icon.png';
import stormIcon from '../../assets/icons/stormy_icon.png';
import './FiveDayForecast.css';

const forecastData = [
  { id: 'today', day: 'Today', icon: rainyIcon, iconAlt: 'Heavy rain', temp: 28 },
  { id: 'mon', day: 'Mon', icon: partlySunnyIcon, iconAlt: 'Partly sunny', temp: 31 },
  { id: 'tue', day: 'Tue', icon: rainyIcon, iconAlt: 'Heavy rain', temp: 27 },
  { id: 'wed', day: 'Wed', icon: stormIcon, iconAlt: 'Storm', temp: 29 },
  { id: 'thu', day: 'Thu', icon: partlySunnyIcon, iconAlt: 'Partly sunny', temp: 32 },
];

function FiveDayForecast() {
  return (
    <div className="fdf-card">
      <h2 className="fdf-title">5 Day Forecast</h2>
      <div className="fdf-row">
        {forecastData.map((item) => (
          <DayForecastCard
            key={item.id}
            day={item.day}
            icon={item.icon}
            iconAlt={item.iconAlt}
            temp={item.temp}
          />
        ))}
      </div>
    </div>
  );
}

export default FiveDayForecast;