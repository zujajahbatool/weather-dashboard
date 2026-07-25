import locationIcon from "../../assets/icons/location_icon.png";
import arrowdownIcon from "../../assets/icons/arrowdown_icon.png";
import "./CurrentWeather.css";

export default function CurrentWeather({ weather, unit = "C", onUnitToggle }) {
  if (!weather) return null;

  return (
    <section className="cw-card">
      <div className="cw-container">
        <div className="cw-toprow">
          <div className="cw-location">
            <img
              src={locationIcon}
              alt="location icon"
              className="cw-location__icon"
            />
            <p className="cw-location__name">
              {weather.city}, {weather.country}
            </p>
          </div>
          <button
            className="cw-unit"
            type="button"
            aria-label="Toggle temperature unit"
            onClick={onUnitToggle}
          >
            <span className="cw-unit__value">&deg;{unit}</span>
            <span className="cw-unit__arrow">
              <img src={arrowdownIcon} alt="arrowdown-icon" />
            </span>
          </button>
        </div>
        <div className="cw-date">
          <h1 className="cw-date__day">{weather.day}</h1>
          <p className="cw-date__full">{weather.date}</p>
        </div>
        <div className="cw-main">
          <div className="cw-main__icon-wrap">
            <img
              src={weather.icon}
              alt={weather.condition}
              className="cw-main__icon"
            />
          </div>
          <div className="cw-main__info">
            <div className="cw-temp">
              <h1 className="cw-temp__current">
                {Math.round(weather.temp)}&deg;{unit}
              </h1>
              <p className="cw-temp__expected">
                /{Math.round(weather.tempMin)}&deg;{unit}
              </p>
            </div>
            <div className="cw-desc">
              <p className="cw-desc__condition">{weather.condition}</p>
              <p className="cw-desc__feelslike">
                Feels like {Math.round(weather.feelsLike)}&deg;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

