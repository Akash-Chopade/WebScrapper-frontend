import React, { useState, useEffect, useRef } from "react";
import API_CONFIG from "../config/api";

const SearchForm = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length >= 2) {
        try {
          const response = await fetch(
            `${API_CONFIG.BASE_URL}/api/cities/search?q=${encodeURIComponent(
              city
            )}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setSuggestions(data.suggestions);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      setActiveSuggestion(-1);
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (activeSuggestion >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            onFocus={() => city.length >= 2 && setShowSuggestions(true)}
            placeholder="Enter Indian city name (e.g., Mumbai, Delhi, Bangalore)"
            className="city-input"
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !city.trim()}
          >
            {loading ? "🔄" : "🔍"} Search
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              ref={(el) => (suggestionRefs.current[index] = el)}
              className={`suggestion-item ${
                index === activeSuggestion ? "active" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              📍 {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
