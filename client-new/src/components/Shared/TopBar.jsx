import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { baseImgUrl } from "../../constance";

const TopBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", !isDarkMode);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                Snap{" "}
                <span className="text-gray-700 dark:text-gray-300">Wave</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
           
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full text-gray-600 dark:text-gray-300  hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
            >
              <FaSignOutAlt />
            </button>
            
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
            >
              <img
                src={
                  baseImgUrl + (user.picturePath || "/assets/profile-image.png")
                }
                alt="Profile"
                className="w-6 h-6 object-cover rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute z-50 bg-white outline-none dark:bg-gray-800 shadow-md w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 outline-none ">
          <Link
            to={`/profile/${user._id}`}
            className="text-gray-600 flex items-center  dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            {" "}
            <FaUser className="mr-2 " />
            Profile
          </Link>
          <button
            onClick={toggleDarkMode}
            className="w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
          >
            {isDarkMode ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
  >
    {text}
  </Link>
);

export default TopBar;
