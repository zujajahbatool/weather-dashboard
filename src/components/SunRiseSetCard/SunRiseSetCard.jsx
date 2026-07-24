import "./SunRiseSetCard.css";

export default function SunRiseSetCard({ icon, iconAlt, label, time }) {
  return (
    <div className="srs-card">
      <img src={icon} alt={iconAlt} className="srs-icon" />
      <div className="srs-info">
        <span className="srs-label">{label}</span>
        <span className="srs-time">{time}</span>
      </div>
    </div>
  );
}