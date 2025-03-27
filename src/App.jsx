import React, { useState, useEffect } from "react";
import TypingSpeedTest from "./typingSpeed";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true" ||
        (localStorage.getItem("darkMode") === null &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center transition-colors duration-300 bg-#1a202c text-black dark:bg-gray-900 dark:text-white">
      <div className="absolute top-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 dark:bg-yellow-500 dark:text-black"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <TypingSpeedTest />
    </div>
  );
  
};

export default App;
