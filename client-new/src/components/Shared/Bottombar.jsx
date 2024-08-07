import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHome, FaSearch, FaPlus, FaPlay, FaBookmark, FaUsers } from "react-icons/fa";

const BottomBar = () => {
  const [route, setRoute] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/create-post") {
      setRoute("create-post");
    } else if (path === "/saved") {
      setRoute("saved");
    } else if (path === "/search") {
      setRoute("search");
    } else if (path === "/home") {
      setRoute("home");
    } else if (path === "/peoples") {
      setRoute("people");
    } else {
      setRoute("");
    }
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-[.75px] w-full text-gray-700 dark:text-gray-300 py-2">
      <div className="flex justify-around items-center ">
        <Link to="/home" className="flex flex-col items-center">
          <FaHome
            size={20}
            className={`${route === "home" ? "text-yellow-600" : ""} `}
          />
        </Link>
        <Link to="/search" className="flex flex-col items-center">
          <FaSearch
            size={18}
            className={`${route === "search" ? "text-yellow-600" : ""} `}
          />
        </Link>
        <Link to="/create-post" className="flex flex-col items-center">
          <FaPlus
            size={20}
            className={`${route === "create-post" ? "text-yellow-600" : ""} `}
          />
        </Link>
        <Link to="/peoples" className="flex flex-col items-center">
          <FaUsers
            size={20}
            className={`${route === "people" ? "text-yellow-600" : ""} `}
          />
        </Link>
        <Link to="/saved" className="flex flex-col items-center">
          <FaBookmark
            size={18}
            className={`${route === "saved" ? "text-yellow-600" : ""} `}
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
