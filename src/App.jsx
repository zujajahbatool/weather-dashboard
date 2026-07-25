import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import OtherCountries from "./components/OtherCountries/OtherCountries.jsx";
import TodaysHighlight from "./components/TodaysHighlight/TodaysHighlight.jsx";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast.jsx";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast.jsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";

// Import backgrounds
import rainyBg from "./assets/images/rainy_background.jpg";
import sunnyBg from "./assets/images/sunny_background.png";
import cloudyBg from "./assets/images/cloudy_background.png";
import snowyBg from "./assets/images/snowy_background.png";
import stormyBg from "./assets/images/stormy_background.png";
import fogBg from "./assets/images/fog_background.png";

// Import weather utils
import {
  mapWeatherIcon,
  mapWeatherBackground,
  formatLocalTime,
  formatHour,
  cToF
} from "./utils/weather";

const bgMap = {
  sunny: sunnyBg,
  cloudy: cloudyBg,
  rainy: rainyBg,
  snowy: snowyBg,
  stormy: stormyBg,
  fog: fogBg,
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [highlights, setHighlights] = useState(null);
  const [bgType, setBgType] = useState("rainy");
  
  // Greeting state
  const [greeting, setGreeting] = useState("Good Morning");

  // Search history state (Recent Searches)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentSearches")) || [];
    } catch {
      return [];
    }
  });

  const fetchWeatherData = async (cityQuery, lat = null, lon = null) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      setError("API Key is missing. Please check .env.local.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let currentUrl = "";
      if (lat !== null && lon !== null) {
        currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      } else {
        if (!cityQuery.trim()) {
          throw new Error("Empty search query. Please enter a city name.");
        }
        currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityQuery.trim())}&appid=${apiKey}&units=metric`;
      }

      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) {
        if (currentRes.status === 404) {
          throw new Error(`City "${cityQuery}" not found. Please verify the name and try again.`);
        } else if (currentRes.status === 429) {
          throw new Error("API rate limit exceeded. Please try again later.");
        } else {
          throw new Error("Failed to retrieve weather data. Please try again.");
        }
      }

      const currentData = await currentRes.json();
      const cityLat = currentData.coord.lat;
      const cityLon = currentData.coord.lon;
      const timezoneOffset = currentData.timezone;

      // Determine local hour for greeting
      const localHour = new Date((currentData.dt + timezoneOffset) * 1000).getUTCHours();
      if (localHour >= 5 && localHour < 12) setGreeting("Good Morning");
      else if (localHour >= 12 && localHour < 17) setGreeting("Good Afternoon");
      else if (localHour >= 17 && localHour < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");

      // Fetch Forecast and UV Index in parallel
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric`;
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;

      const [forecastRes, uvRes] = await Promise.all([
        fetch(forecastUrl),
        fetch(uvUrl).catch(() => null)
      ]);

      if (!forecastRes.ok) {
        throw new Error("Failed to retrieve forecast details.");
      }

      const forecastData = await forecastRes.json();

      let uvValue = 0;
      if (uvRes && uvRes.ok) {
        const uvData = await uvRes.json();
        uvValue = uvData.value;
      }

      // Process Current Weather
      const { dayName, dateStr, timeStr } = formatLocalTime(currentData.dt, timezoneOffset);
      const mainCond = currentData.weather[0].main;

      const processedWeather = {
        city: currentData.name,
        country: currentData.sys.country,
        temp: currentData.main.temp,
        tempMin: currentData.main.temp_min,
        tempMax: currentData.main.temp_max,
        day: dayName,
        date: dateStr,
        icon: mapWeatherIcon(mainCond, currentData.weather[0].icon),
        condition: currentData.weather[0].description.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        feelsLike: currentData.main.feels_like,
      };

      setBgType(mapWeatherBackground(mainCond));

      // Process Highlights
      const uvText = uvValue <= 2 ? "Low UV" : uvValue <= 5 ? "Moderate UV" : uvValue <= 7 ? "High UV" : "Very High UV";
      const hum = currentData.main.humidity;
      const humText = hum <= 30 ? "Dry air" : hum <= 60 ? "Humidity is good" : "Humid air";

      const processedHighlights = {
        windSpeed: currentData.wind.speed * 3.6, // m/s to km/h
        currentTime: timeStr,
        humidity: hum,
        humidityDesc: humText,
        uvIndex: uvValue,
        uvDesc: uvText,
        visibility: currentData.visibility / 1000, // m to km
        sunrise: formatLocalTime(currentData.sys.sunrise, timezoneOffset).timeStr,
        sunset: formatLocalTime(currentData.sys.sunset, timezoneOffset).timeStr,
      };

      // Process Hourly (First 8 entries in forecast list represent next 24h in 3h steps)
      const hourlyList = forecastData.list.slice(0, 8).map(item => ({
        time: formatHour(item.dt, timezoneOffset),
        icon: mapWeatherIcon(item.weather[0].main, item.weather[0].icon),
        condition: item.weather[0].main,
        temp: item.main.temp
      }));

      // Process 5-Day Forecast by grouping 3-hourly entries by date
      const daysMap = {};
      forecastData.list.forEach((item) => {
        const { dateStr, dayName } = formatLocalTime(item.dt, timezoneOffset);
        if (!daysMap[dateStr]) {
          daysMap[dateStr] = {
            dayName,
            tempMax: -999,
            tempMin: 999,
            slots: []
          };
        }
        daysMap[dateStr].tempMax = Math.max(daysMap[dateStr].tempMax, item.main.temp_max);
        daysMap[dateStr].tempMin = Math.min(daysMap[dateStr].tempMin, item.main.temp_min);
        daysMap[dateStr].slots.push(item);
      });

      let processedForecast = Object.keys(daysMap).map((dateKey) => {
        const dayData = daysMap[dateKey];
        const midSlot = dayData.slots[Math.floor(dayData.slots.length / 2)] || dayData.slots[0];

        return {
          id: dateKey,
          day: dayData.dayName,
          icon: mapWeatherIcon(midSlot.weather[0].main, midSlot.weather[0].icon),
          condition: midSlot.weather[0].main,
          tempMax: dayData.tempMax,
          tempMin: dayData.tempMin,
        };
      });

      // Filter and set first day name to Today
      processedForecast = processedForecast.slice(0, 5);
      if (processedForecast.length > 0) {
        processedForecast[0].day = "Today";
      }

      setWeather(processedWeather);
      setHighlights(processedHighlights);
      setHourly(hourlyList);
      setForecast(processedForecast);

      // Save last searched city
      localStorage.setItem("lastCity", currentData.name);

      // Update recent searches
      setRecentSearches(prev => {
        const cleanedName = currentData.name;
        const filtered = prev.filter(c => c.toLowerCase() !== cleanedName.toLowerCase());
        const updated = [cleanedName, ...filtered].slice(0, 5);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        return updated;
      });

    } catch (err) {
      setError(err.message || "Failed to fetch weather details.");
    } finally {
      setLoading(false);
    }
  };

  // Apply light/dark theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply background dynamically
  useEffect(() => {
    const url = bgMap[bgType] || rainyBg;
    document.body.style.backgroundImage = `url(${url})`;
  }, [bgType]);

  // Initial load: Geolocation lookup, falling back to localStorage last city or Dhaka
  useEffect(() => {
    const initializeWeather = async () => {
      const lastCity = localStorage.getItem("lastCity") || "Dhaka";

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData("", latitude, longitude);
          },
          () => {
            fetchWeatherData(lastCity);
          },
          { timeout: 8000 }
        );
      } else {
        await fetchWeatherData(lastCity);
      }
    };

    initializeWeather();
  }, []);

  const handleSearch = (query) => {
    fetchWeatherData(query);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
  };

  const handleUnitToggle = () => {
    setUnit(prev => (prev === "C" ? "F" : "C"));
  };

  // Convert values dynamically based on selected unit
  const displayedWeather = weather ? {
    ...weather,
    temp: unit === "F" ? cToF(weather.temp) : weather.temp,
    tempMin: unit === "F" ? cToF(weather.tempMin) : weather.tempMin,
    tempMax: unit === "F" ? cToF(weather.tempMax) : weather.tempMax,
    feelsLike: unit === "F" ? cToF(weather.feelsLike) : weather.feelsLike,
  } : null;

  const displayedForecast = forecast.map(day => ({
    ...day,
    tempMax: unit === "F" ? cToF(day.tempMax) : day.tempMax,
    tempMin: unit === "F" ? cToF(day.tempMin) : day.tempMin,
  }));

  const displayedHourly = hourly.map(hour => ({
    ...hour,
    temp: unit === "F" ? cToF(hour.temp) : hour.temp,
  }));

  return (
    <div className="app">
      <Sidebar />
      <main className="app-main">
        <div className="app-topbar">
          <div className="app-greeting-block">
            <div className="name-of-person">Hi, Zujajah</div>
            <div className="app-greeting">{greeting}</div>
          </div>
          <Header
            theme={theme}
            onThemeChange={handleThemeChange}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {/* Recent searches history pills */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <span className="recent-searches__title">Recent Searches:</span>
            <div className="recent-searches__list">
              {recentSearches.map((city, idx) => (
                <button
                  key={idx}
                  className="recent-search-pill"
                  onClick={() => handleSearch(city)}
                  disabled={loading}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error-card fade-in">
            <div className="error-card__icon">⚠️</div>
            <div className="error-card__content">
              <h3 className="error-card__title">Something went wrong</h3>
              <p className="error-card__message">{error}</p>
            </div>
          </div>
        )}

        <div className="dashboard-grid">
          {loading ? (
            <div className="spinner-container">
              <LoadingSpinner size={60} />
            </div>
          ) : (
            <>
              <div className="dashboard-col dashboard-col--left fade-in">
                <CurrentWeather
                  weather={displayedWeather}
                  unit={unit}
                  onUnitToggle={handleUnitToggle}
                />
                <OtherCountries unit={unit} />
              </div>
              <div className="dashboard-col dashboard-col--right fade-in">
                <TodaysHighlight highlights={highlights} />
                <HourlyForecast hourlyData={displayedHourly} unit={unit} />
                <FiveDayForecast forecastData={displayedForecast} unit={unit} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}