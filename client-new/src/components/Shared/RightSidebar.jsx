import React, { useEffect, useState } from "react";
import { FaUserPlus, FaDice, FaSpinner } from "react-icons/fa";
import api from "../../utils/axios";
import { baseImgUrl } from "../../constance";
import { PeopleCard } from "../Cards/PeopleCard";

const RightSidebar = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const ourUserId = localStorage.getItem("user_id");
        const response = await api.get(`/users/suggest-user/${ourUserId}`);
        setPeopleList(response.data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [refresh]);

  const handleShuffle = () => {
    setIsShuffling(true);
    setRefresh(!refresh);
    setTimeout(() => {
      setIsShuffling(false);
    }, 500);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 p-6 overflow-y-auto flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Find People
      </h2>
      <div className="space-y-4 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error}
          </div>
        ) : peopleList.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No users to display suggestions here!
          </div>
        ) : (
          peopleList.map((person, index) => (
            <PeopleCard
              key={person.id || index}
              person={person}
            />
          ))
        )}
      </div>
      <button
        onClick={handleShuffle}
        className="mt-6 flex items-center justify-center space-x-2 w-full  dark:text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
        disabled={isShuffling}
      >
        <FaDice className={`text-2xl ${isShuffling ? "animate-spin" : ""}`} />
        <span className="font-medium">Shuffle Suggestions</span>
      </button>
    </div>
  );
};

export default RightSidebar;
