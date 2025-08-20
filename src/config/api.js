// API Configuration
const API_CONFIG = {
  // Production backend URL (Render)
  PRODUCTION_URL: "https://webscrapper-backend-imc6.onrender.com",

  // Development backend URL (local)
  DEVELOPMENT_URL: "http://127.0.0.1:5000",

  // Automatically detect environment
  get BASE_URL() {
    // Check if we're running in development (localhost)
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "";

    return isDevelopment ? this.DEVELOPMENT_URL : this.PRODUCTION_URL;
  },
};

export default API_CONFIG;
