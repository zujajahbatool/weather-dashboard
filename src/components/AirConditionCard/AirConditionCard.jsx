import "./AirConditionCard.css";

export default function AirConditionCard({ icon, iconAlt, label, value, unit, detail }) {
  return (
    <div className="ac-card">
      <div className="ac-header">
        <img src={icon} alt={iconAlt} className="ac-icon" />
        <span className="ac-label">{label}</span>
      </div>
      <div className="ac-value">
        {value}
        <span className="ac-unit">{unit}</span>
      </div>
      <div className="ac-detail">{detail}</div>
    </div>
  );
}