import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchForm from "./components/SearchForm";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
      const data = await response.json();

      if (data.status === "error") {
        setError(data.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌦️ Weather Scraper</h1>
        <p>Get real-time weather information for Indian cities</p>
      </header>

      <main className="App-main">
        <SearchForm onSearch={fetchWeather} loading={loading} />

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <p>🔄 Searching for weather data...</p>
          </div>
        )}

        {weatherData && !loading && <WeatherCard data={weatherData} />}
      </main>

      <footer className="App-footer">
        <p>Powered by Times of India Weather Data</p>
      </footer>
    </div>
  );
}

export default App;
