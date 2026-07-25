import "./TodaysHighlight.css";
import AirConditionCard from "../AirConditionCard/AirConditionCard.jsx";
import SunRiseSetCard from "../SunRiseSetCard/SunRiseSetCard.jsx";

import windIcon from "../../assets/icons/wind_status.png";
import humidityIcon from "../../assets/icons/humidity.png";
import uvIcon from "../../assets/icons/uv_index.png";
import visibilityIcon from "../../assets/icons/visibility.png";
import sunriseIcon from "../../assets/icons/sunrise.png";
import sunsetIcon from "../../assets/icons/sunset.png";

export default function TodaysHighlight({ highlights }) {
  if (!highlights) return null;

  const windCard = {
    id: "wind",
    icon: windIcon,
    iconAlt: "Wind status icon",
    label: "Wind Status",
    value: highlights.windSpeed.toFixed(2),
    unit: "km/h",
    detail: highlights.currentTime,
  };

  const humidityCard = {
    id: "humidity",
    icon: humidityIcon,
    iconAlt: "Humidity icon",
    label: "Humidity",
    value: String(highlights.humidity),
    unit: "%",
    detail: highlights.humidityDesc,
  };

  const uvCard = {
    id: "uv",
    icon: uvIcon,
    iconAlt: "UV index icon",
    label: "UV Index",
    value: String(Math.round(highlights.uvIndex)),
    unit: "UV",
    detail: highlights.uvDesc,
  };

  const visibilityCard = {
    id: "visibility",
    icon: visibilityIcon,
    iconAlt: "Visibility icon",
    label: "Visibility",
    value: String(highlights.visibility),
    unit: "km",
    detail: highlights.currentTime,
  };

  const sunriseCard = {
    id: "sunrise",
    icon: sunriseIcon,
    iconAlt: "Sunrise icon",
    label: "Sunrise",
    time: highlights.sunrise,
  };

  const sunsetCard = {
    id: "sunset",
    icon: sunsetIcon,
    iconAlt: "Sunset icon",
    label: "Sunset",
    time: highlights.sunset,
  };

  return (
    <div className="th-card">
      <h2 className="th-title">Today's Highlight</h2>
      <div className="th-grid">
        <AirConditionCard {...windCard} />
        <AirConditionCard {...humidityCard} />
        <SunRiseSetCard {...sunriseCard} />
        <AirConditionCard {...uvCard} />
        <AirConditionCard {...visibilityCard} />
        <SunRiseSetCard {...sunsetCard} />
      </div>
    </div>
  );
}