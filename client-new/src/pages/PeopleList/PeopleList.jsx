import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { baseImgUrl } from "../../constance";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { followUser } from "../../utils/followUser";
import { useNavigate } from "react-router-dom";

const PeopleList = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const ourUserId = localStorage.getItem("user_id");
        const response = await api.get(`/users/get-all-users/${ourUserId}`);
        setPeopleList(response.data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Peoples</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  gap-4">
        {peopleList.map((user) => (
          <PeopleCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;

const PeopleCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user.followers.includes(localStorage.getItem("user_id"))) {
      setIsFollowing(true);
    }
  }, []);
  const handleFollowToggle = async () => {
    const friendId = user._id;
    try {
      const res = await followUser({ friendId });
      if (res) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const handleRedirect = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center  dark:bg-gray-700 dark:text-white">
      <img
        src={baseImgUrl + user.picturePath}
        alt={`${user.firstName}'s avatar`}
        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover cursor-pointer"
        onClick={handleRedirect}
      />
      <h2
        className="text-xl font-semibold text-center cursor-pointer"
        onClick={handleRedirect}
      >
        {user.firstName + " " + user.lastName}
      </h2>
      <p className="text-gray-600 text-center dark:text-gray-400">{user.email}</p>
      <p className="text-sm text-gray-500 text-center mt-2 dark:text-gray-400">
        {user.occupation}
      </p>
      <button
        onClick={handleFollowToggle}
        className={` px-3 py-1 mt-2 rounded-full text-sm font-medium ${
          isFollowing
            ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        } transition-colors duration-200`}
      >
        {isFollowing ? (
          <>
            <FaUserCheck className="inline-block mr-1" />
            Following
          </>
        ) : (
          <>
            <FaUserPlus className="inline-block mr-1" />
            Follow
          </>
        )}
      </button>
    </div>
  );
};
