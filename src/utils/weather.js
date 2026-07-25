import sunnyIcon from "../assets/icons/sunny_icon.png";
import cloudyIcon from "../assets/icons/cloudy_icon.png";
import partlySunnyIcon from "../assets/icons/partlysunny_icon.png";
import rainyIcon from "../assets/icons/rainy_icon.png";
import snowyIcon from "../assets/icons/snowy_icon.png";
import stormyIcon from "../assets/icons/stormy_icon.png";
import mistIcon from "../assets/icons/mist_icon.png";

/**
 * Maps OpenWeather API condition code or main name to local assets.
 */
export function mapWeatherIcon(mainCondition, iconCode) {
  if (!mainCondition) return cloudyIcon;

  const cond = mainCondition.toLowerCase();
  
  if (cond.includes("clear") || iconCode === "01d" || iconCode === "01n") {
    return sunnyIcon;
  }
  if (cond.includes("cloud")) {
    if (iconCode === "02d" || iconCode === "02n") {
      return partlySunnyIcon;
    }
    return cloudyIcon;
  }
  if (cond.includes("rain") || cond.includes("drizzle")) {
    return rainyIcon;
  }
  if (cond.includes("snow")) {
    return snowyIcon;
  }
  if (cond.includes("thunderstorm") || cond.includes("storm")) {
    return stormyIcon;
  }
  // mist, fog, smoke, haze, squall, tornado, etc.
  return mistIcon;
}

/**
 * Maps weather condition to dynamic background name.
 */
export function mapWeatherBackground(mainCondition) {
  if (!mainCondition) return "rainy";
  const cond = mainCondition.toLowerCase();
  
  if (cond.includes("clear")) return "sunny";
  if (cond.includes("cloud")) return "cloudy";
  if (cond.includes("rain") || cond.includes("drizzle")) return "rainy";
  if (cond.includes("snow")) return "snowy";
  if (cond.includes("thunderstorm") || cond.includes("storm")) return "stormy";
  return "fog"; // Mist, fog, haze
}

/**
 * Formats a local date & time using UTC offset in seconds.
 */
export function formatLocalTime(dt, timezone) {
  // Convert dt (seconds) to UTC milliseconds, offset by timezone shift (seconds)
  const localDate = new Date((dt + timezone) * 1000);
  
  const dayName = localDate.toLocaleString("en-US", {
    weekday: "long",
    timeZone: "UTC"
  });
  
  const dateStr = localDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });

  const timeStr = localDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC"
  });

  return { dayName, dateStr, timeStr };
}

/**
 * Converts a timestamp to a simple hour string (e.g. "9:00 AM").
 */
export function formatHour(dt, timezone) {
  const localDate = new Date((dt + timezone) * 1000);
  return localDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC"
  });
}

/**
 * Converts Celsius to Fahrenheit
 */
export function cToF(c) {
  return (c * 9) / 5 + 32;
}
