import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";

const TopBar = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial dark mode state from local storage
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference === 'true' || false;
  });


  const handleLogout = () => {
    dispatch(clearUser());
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save dark mode preference to local storage
    localStorage.setItem('darkMode', darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex items-center">
          <img
            src="https://parspng.com/wp-content/uploads/2021/09/instagram-7.png"
            alt="logo"
            className="w-32 h-auto"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center"
            onClick={handleLogout}
          >
            <LogoutSvg />
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

const LogoutSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M9.75 3a.75.75 0 0 1 .75.75V12h-1.5V4.5H5.25a.75.75 0 0 1-.75-.75V3h5.25zM3 4.5h1.5v15H3v-15zm18.03 8.78a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 1 0-1.06 1.06L17.94 12h-8.69a.75.75 0 1 0 0 1.5h8.69l-2.47 2.47a.75.75 0 0 0 1.06 1.06l4.5-4.5z"
      clipRule="evenodd"
    />
  </svg>
);
