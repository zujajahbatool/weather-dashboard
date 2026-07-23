import "./OtherCountryCard.css";

export default function OtherCountryCard({ country, city, description, tempHigh, tempLow, icon, iconAlt }) {
  return (
    <div className="occ-card">
      <div className="occ-info">
        <p className="occ-country">{country}</p>
        <p className="occ-city">{city}</p>
        <p className="occ-desc">{description}</p>
      </div>

      <div className="occ-icon-wrap">
        <img src={icon} alt={iconAlt} className="occ-icon" />
      </div>

      <p className="occ-temp">
        {tempHigh}°<span className="occ-temp__sub">/{tempLow}°</span>
      </p>
    </div>
  );
}