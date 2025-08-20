import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/weather/${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (data.status === "error") {
        setError({
          message: data.message,
          type: data.error_type || "general",
        });
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError({
        message:
          "Failed to fetch weather data. Please check your internet connection and try again.",
        type: "network",
      });
    } finally {
      setLoading(false);
    }
  };

  const getErrorIcon = (errorType) => {
    switch (errorType) {
      case "city_not_found":
        return "🏙️";
      case "no_data_found":
        return "📭";
      case "network":
      case "network_error":
        return "🌐";
      default:
        return "⚠️";
    }
  };

  return (
    <div className={`App ${isDark ? "dark" : "light"}`}>
      <header className="App-header">
        <div className="header-content">
          <div className="header-text">
            <h1>🌦️ Weather Scraper</h1>
            <p>Get real-time weather information for Indian cities</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="App-main">
        <SearchForm onSearch={fetchWeather} loading={loading} />

        {error && (
          <div className="error-message">
            <div className="error-icon">{getErrorIcon(error.type)}</div>
            <div className="error-content">
              <h3>Oops! Something went wrong</h3>
              <p>{error.message}</p>
              {error.type === "city_not_found" && (
                <div className="error-suggestions">
                  <p>💡 Try searching for popular cities like:</p>
                  <div className="city-suggestions">
                    {["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"].map(
                      (city) => (
                        <button
                          key={city}
                          className="suggestion-chip"
                          onClick={() => fetchWeather(city)}
                          disabled={loading}
                        >
                          {city}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="loading-spinner">🔄</div>
            <p>Searching for weather data...</p>
          </div>
        )}

        {weatherData && !loading && <WeatherCard data={weatherData} />}
      </main>

      <footer className="App-footer">
        <p>Powered by Times of India Weather Data • Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
