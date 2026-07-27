# Weather Dashboard

A responsive weather dashboard built with React and Vite, featuring real-time weather data, a 5-day forecast, and a searchable history of previously viewed cities — all wrapped in a dark-mode-first dashboard UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Live weather data** from the OpenWeather API — current conditions, temperature, "feels like", and weather description
- **5-day forecast** grouped from 3-hourly forecast data
- **Today's Highlights** — wind speed, humidity, UV index, visibility, sunrise & sunset times
- **Geolocation support** — automatically detects the user's location on first load, with a fallback to the last searched city
- **City search** with graceful error handling (invalid city, rate limits, network issues)
- **Recent searches** — the last 5 searched cities are saved and shown in an "Other Countries" panel, persisted in `localStorage`
- **°C / °F unit toggle**
- **Dark / light theme toggle**, persisted across sessions
- **Dynamic backgrounds** that change based on current weather conditions (sunny, rainy, cloudy, snowy, stormy, foggy)
- **Collapsible sidebar** navigation, fully responsive

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [OpenWeather API](https://openweathermap.org/api) — current weather, 5-day/3-hour forecast, and UV index endpoints
- Plain CSS (no UI framework) with CSS custom properties for theming
- ESLint for code quality

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── assets/
│   │   ├── icons/            # Weather & UI icons
│   │   └── images/           # Dynamic background images
│   ├── components/
│   │   ├── AirConditionCard/ # Reusable stat card (wind, humidity, UV, visibility)
│   │   ├── CurrentWeather/   # Main current-weather panel
│   │   ├── DayForecastCard/  # Single day forecast card
│   │   ├── FiveDayForecast/  # 5-day forecast list
│   │   ├── Header/           # Search bar + theme toggle
│   │   ├── LoadingSpinner/   # Loading indicator
│   │   ├── OtherCountries/   # Recent searches panel
│   │   ├── OtherCountryCard/ # Single recent-search card
│   │   ├── Sidebar/          # Collapsible navigation sidebar
│   │   ├── SunRiseSetCard/   # Sunrise / sunset card
│   │   └── TodaysHighlight/  # Highlights grid (wind, humidity, UV, etc.)
│   ├── utils/
│   │   └── weather.js        # Icon/background mapping, time formatting, °C→°F conversion
│   ├── App.jsx                # Core app logic — state, data fetching, layout
│   └── main.jsx                # React entry point
├── .env.example
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/zujajahbatool/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your environment variables

   Copy `.env.example` to a new `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

   Then add your OpenWeather API key:
   ```
   VITE_WEATHER_API_KEY="your-api-key-here"
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

> **Note:** Without a valid API key, the app falls back to mock data so the UI can still be viewed and tested.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_WEATHER_API_KEY` | Your OpenWeatherMap API key. Required for live weather, forecast, and UV index data. |

## 🗺️ Roadmap / Possible Improvements

- Hourly forecast view
- Multi-language support
- Air quality index card
- Unit tests for utility functions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
