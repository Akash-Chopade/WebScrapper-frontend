import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>📍 {data.city}</h2>
        <p className="date-time">
          {data.date} • {data.time}
        </p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">{data.temperature}</div>
          <div className="environment">{data.environment}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{data.humidity}</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">{data.wind_speed}</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌧️</span>
          <span className="detail-label">Rain Probability:</span>
          <span className="detail-value">{data.rain_probability}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
