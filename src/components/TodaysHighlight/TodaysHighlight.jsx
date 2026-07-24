import "./TodaysHighlight.css";
import AirConditionCard from "../AirConditionCard/AirConditionCard.jsx";
import SunRiseSetCard from "../SunRiseSetCard/SunRiseSetCard.jsx";

import windIcon from "../../assets/icons/wind_status.png";
import humidityIcon from "../../assets/icons/humidity.png";
import uvIcon from "../../assets/icons/uv_index.png";
import visibilityIcon from "../../assets/icons/visibility.png";
import sunriseIcon from "../../assets/icons/sunrise.png";
import sunsetIcon from "../../assets/icons/sunset.png";

const airConditions = [
  { id: "wind", icon: windIcon, iconAlt: "Wind status icon", label: "Wind Status", value: "7.90", unit: "km/h", detail: "9:00 AM" },
  { id: "humidity", icon: humidityIcon, iconAlt: "Humidity icon", label: "Humidity", value: "85", unit: "%", detail: "Humidity is good" },
  { id: "uv", icon: uvIcon, iconAlt: "UV index icon", label: "UV Index", value: "4", unit: "UV", detail: "Moderate UV" },
  { id: "visibility", icon: visibilityIcon, iconAlt: "Visibility icon", label: "Visibility", value: "5", unit: "km", detail: "9:00 AM" },
];

const sunTimes = [
  { id: "sunrise", icon: sunriseIcon, iconAlt: "Sunrise icon", label: "Sunrise", time: "4:50 AM" },
  { id: "sunset", icon: sunsetIcon, iconAlt: "Sunset icon", label: "Sunset", time: "6:45 PM" },
];

export default function TodaysHighlight() {
  return (
    <div className="th-card">
      <h2 className="th-title">Today's Highlight</h2>
      <div className="th-grid">
        <div className="th-row">
          <AirConditionCard {...airConditions[0]} />
          <AirConditionCard {...airConditions[1]} />
          <SunRiseSetCard {...sunTimes[0]} />
        </div>
        <div className="th-row">
          <AirConditionCard {...airConditions[2]} />
          <AirConditionCard {...airConditions[3]} />
          <SunRiseSetCard {...sunTimes[1]} />
        </div>
      </div>
    </div>
  );
}