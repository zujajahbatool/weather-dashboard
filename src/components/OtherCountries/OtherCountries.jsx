import OtherCountryCard from "../OtherCountryCard/OtherCountryCard";
import arrowDown from "../../assets/icons/arrowdown_icon.png";
import sunnyIcon from "./assets/icons/sunny_icon.png";
import partlysunnyIcon from "./assets/icons/partlysunny_icon.png";
import "./OtherCountries.css";

const countries = [
  {
    id: "australia",
    country: "Australia",
    city: "Canberra",
    description: "Sunny",
    tempHigh: 32,
    tempLow: 24,
    icon: sunnyIcon,
    iconAlt: "Sunny weather icon",
  },
  {
    id: "japan",
    country: "Japan",
    city: "Tokyo",
    description: "Mostly Sunny",
    tempHigh: 30,
    tempLow: 19,
    icon: partlysunnyIcon,
    iconAlt: "Mostly sunny weather icon",
  },
];

export default function OtherCountries() {
  return (
    <div className="oc-card">
      <div className="oc-header">
        <h2 className="oc-title">Others Countries</h2>
        <button className="oc-seeall" type="button">
          <span className="oc-seeall__text">See all</span>
          <img src={arrowDown} alt="" className="oc-seeall__arrow" />
        </button>
      </div>

      <div className="oc-list">
        {countries.map((c) => (
          <OtherCountryCard
            key={c.id}
            country={c.country}
            city={c.city}
            description={c.description}
            tempHigh={c.tempHigh}
            tempLow={c.tempLow}
            icon={c.icon}
            iconAlt={c.iconAlt}
          />
        ))}
      </div>
    </div>
  );
}