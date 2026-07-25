import { useState, useEffect } from "react";
import OtherCountryCard from "../OtherCountryCard/OtherCountryCard";
import arrowDown from "../../assets/icons/arrowdown_icon.png";
import { mapWeatherIcon, cToF } from "../../utils/weather";
import "./OtherCountries.css";

const initialCities = [
  { id: "australia", country: "Australia", city: "Canberra", q: "Canberra,AU" },
  { id: "japan", country: "Japan", city: "Tokyo", q: "Tokyo,JP" },
];

export default function OtherCountries({ unit = "C" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOtherCities = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) return;

      const promises = initialCities.map(async (c) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${c.q}&appid=${apiKey}&units=metric`
          );
          if (!res.ok) throw new Error("Fetch failed");
          const weather = await res.json();
          
          return {
            id: c.id,
            country: c.country,
            city: c.city,
            description: weather.weather[0].main,
            tempHigh: weather.main.temp_max,
            tempLow: weather.main.temp_min,
            icon: mapWeatherIcon(weather.weather[0].main, weather.weather[0].icon),
            iconAlt: weather.weather[0].description,
          };
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          return null;
        }
      });

      const results = await Promise.all(promises);
      const filtered = results.filter(Boolean);
      if (filtered.length > 0) {
        setData(filtered);
      }
    };

    fetchOtherCities();
  }, []);

  const displayData = data.length > 0 ? data : [
    {
      id: "australia",
      country: "Australia",
      city: "Canberra",
      description: "Sunny",
      tempHigh: 32,
      tempLow: 24,
      icon: mapWeatherIcon("Clear", "01d"),
      iconAlt: "Sunny weather icon",
    },
    {
      id: "japan",
      country: "Japan",
      city: "Tokyo",
      description: "Mostly Sunny",
      tempHigh: 30,
      tempLow: 19,
      icon: mapWeatherIcon("Clouds", "02d"),
      iconAlt: "Mostly sunny weather icon",
    },
  ];

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
        {displayData.map((c) => {
          const th = unit === "F" ? cToF(c.tempHigh) : c.tempHigh;
          const tl = unit === "F" ? cToF(c.tempLow) : c.tempLow;
          return (
            <OtherCountryCard
              key={c.id}
              country={c.country}
              city={c.city}
              description={c.description}
              tempHigh={Math.round(th)}
              tempLow={Math.round(tl)}
              icon={c.icon}
              iconAlt={c.iconAlt}
            />
          );
        })}
      </div>
    </div>
  );
}
