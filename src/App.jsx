import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import OtherCountries from "./components/OtherCountries/OtherCountries.jsx";
import TodaysHighlight from "./components/TodaysHighlight/TodaysHighlight.jsx";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast.jsx";
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
  const [highlights, setHighlights] = useState(null);
  const [bgType, setBgType] = useState("rainy");
  
  // Greeting state
  const [greeting, setGreeting] = useState("Good Morning");

  // Search history state (Recent Searches)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentSearchesWeather")) || [];
    } catch {
      return [];
    }
  });

  const fetchCitiesWeather = async (citiesList) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) return [];

    const promises = citiesList.map(async (cityName) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        return {
          id: data.name.toLowerCase() + "-" + data.sys.country.toLowerCase(),
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].main,
          tempHigh: data.main.temp_max,
          tempLow: data.main.temp_min,
          icon: mapWeatherIcon(data.weather[0].main, data.weather[0].icon),
          iconAlt: data.weather[0].description,
        };
      } catch (err) {
        console.error("Error fetching city weather:", cityName, err);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter(Boolean);
  };

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
      setForecast(processedForecast);

      // Save last searched city
      localStorage.setItem("lastCity", currentData.name);

      // Update recent searches
      setRecentSearches(prev => {
        const cityWeatherInfo = {
          id: currentData.name.toLowerCase() + "-" + currentData.sys.country.toLowerCase(),
          city: currentData.name,
          country: currentData.sys.country,
          description: currentData.weather[0].main,
          tempHigh: currentData.main.temp_max,
          tempLow: currentData.main.temp_min,
          icon: mapWeatherIcon(mainCond, currentData.weather[0].icon),
          iconAlt: currentData.weather[0].description,
        };

        const filtered = prev.filter(c => c.city.toLowerCase() !== cityWeatherInfo.city.toLowerCase());
        const updated = [cityWeatherInfo, ...filtered].slice(0, 5);
        localStorage.setItem("recentSearchesWeather", JSON.stringify(updated));
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

  // Initial load: Geolocation lookup, falling back to localStorage last city or Dhaka, plus recent searches refresh
  useEffect(() => {
    const initializeWeather = async () => {
      const lastCity = localStorage.getItem("lastCity") || "Dhaka";

      // Load recent searches
      let savedRecent = [];
      try {
        savedRecent = JSON.parse(localStorage.getItem("recentSearchesWeather")) || [];
      } catch {
        savedRecent = [];
      }

      if (savedRecent.length === 0) {
        // First load: pre-populate with 2 default locations: Canberra, Tokyo
        const defaults = ["Canberra", "Tokyo"];
        const defaultWeather = await fetchCitiesWeather(defaults);
        if (defaultWeather.length > 0) {
          setRecentSearches(defaultWeather);
          localStorage.setItem("recentSearchesWeather", JSON.stringify(defaultWeather));
        }
      } else {
        // Refresh weather data for cached cities
        const cityNames = savedRecent.map(c => c.city);
        const refreshedWeather = await fetchCitiesWeather(cityNames);
        if (refreshedWeather.length > 0) {
          setRecentSearches(refreshedWeather);
          localStorage.setItem("recentSearchesWeather", JSON.stringify(refreshedWeather));
        }
      }

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
                <OtherCountries
                  unit={unit}
                  recentSearches={recentSearches}
                  onSearch={handleSearch}
                  activeCity={displayedWeather?.city}
                />
              </div>
              <div className="dashboard-col dashboard-col--right fade-in">
                <TodaysHighlight highlights={highlights} />
                <FiveDayForecast forecastData={displayedForecast} unit={unit} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}