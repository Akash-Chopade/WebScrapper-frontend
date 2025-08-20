import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? "☀️" : "🌙"} {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
