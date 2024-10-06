import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for dark mode preference
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Switch
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default DarkModeToggle;
