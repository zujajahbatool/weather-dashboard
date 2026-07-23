import locationIcon from "../../assets/icons/location_icon.png";
import arrowdownIcon from "../../assets/icons/arrowdown_icon.png";
import rainyIcon from "../../assets/icons/rainy_icon.png";
import "./CurrentWeather.css";

export default function CurrentWeather() {
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
            <p className="cw-location__name">Dhaka, Bangladesh</p>
          </div>
          <button
            className="cw-unit"
            type="button"
            aria-label="Toggle temperature unit"
          >
            <span className="cw-unit__value">&deg;C</span>
            <span className="cw-unit__arrow"><img src={arrowdownIcon} alt="arrowdown-icon" /></span>
          </button>
        </div>
        <div className="cw-date">
          <h1 className="cw-date__day">Sunday</h1>
          <p className="cw-date__full">04 Aug, 2024</p>
        </div>
        <div className="cw-main">
          <div className="cw-main__icon-wrap">
            <img
              src={rainyIcon}
              alt="weather icon"
              className="cw-main__icon"
            />
          </div>
          <div className="cw-main__info">
            <div className="cw-temp">
              <h1 className="cw-temp__current">28&deg;C</h1>
              <p className="cw-temp__expected">/24&deg;C</p>
            </div>
            <div className="cw-desc">
              <p className="cw-desc__condition">Heavy Rain</p>
              <p className="cw-desc__feelslike">Feels like 31&deg;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
