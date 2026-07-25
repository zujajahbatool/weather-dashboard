import { useState } from "react";
import OtherCountryCard from "../OtherCountryCard/OtherCountryCard";
import arrowDown from "../../assets/icons/arrowdown_icon.png";
import { cToF } from "../../utils/weather";
import "./OtherCountries.css";

export default function OtherCountries({ unit = "C", recentSearches = [], onSearch, activeCity }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out the currently active city (case-insensitive check)
  const filtered = recentSearches.filter(
    (c) => c.city.toLowerCase() !== activeCity?.toLowerCase()
  );

  // When collapsed, show at most 2 items. When expanded, show all.
  const displayedSearches = isExpanded ? filtered : filtered.slice(0, 2);

  return (
    <div className={`oc-card ${isExpanded ? "expanded" : ""}`}>
      <div className="oc-header">
        <h2 className="oc-title">Others Countries</h2>
        {filtered.length > 2 && (
          <button 
            className="oc-seeall" 
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="oc-seeall__text">
              {isExpanded ? "See less" : "See all"}
            </span>
            <img 
              src={arrowDown} 
              alt="" 
              className={`oc-seeall__arrow ${isExpanded ? "expanded" : ""}`} 
            />
          </button>
        )}
      </div>

      <div className="oc-list">
        {displayedSearches.map((c) => {
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
              onClick={() => onSearch && onSearch(c.city)}
            />
          );
        })}
      </div>
    </div>
  );
}
