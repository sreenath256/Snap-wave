import { useState } from "react";
import { followUser } from "../../utils/followUser";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PeopleCard = ({ id, profileImage, name, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);


  const handleFollowToggle = async () => {
    const friendId = id;
    try {
      const res = await followUser({ friendId });
      if (res) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };
  return (
    <div>
      <Link to={`profile/${id}`}>
      <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src={profileImage}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3 flex-grow">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
        </div>
        <button
          className={` px-3 py-1 rounded-full text-blue-500  dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200
            ${isFollowing
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          } transition-colors duration-200`}
          
          onClick={handleFollowToggle}
        >
         {isFollowing ? (
            <>
              <FaUserCheck size={17} />
            </>
          ) : (
            <>
              <FaUserPlus size={17} />
            </>
          )}
        </button>
      </div>
      </Link>

    </div>
  );
};