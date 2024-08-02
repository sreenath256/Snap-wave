import { useEffect, useState } from "react";
import { followUser } from "../../utils/followUser";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { baseImgUrl } from "../../constance";
import { navigateToProfile } from "../../utils/navigateToProfile";

export const PeopleCard = ({ name, username, person }) => {
  const { picturePath, firstName, lastName } = person;

  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    if (person.followers.includes(localStorage.getItem("user_id"))) {
      setIsFollowing(true);
    }
  }, []);

  const handleFollowToggle = async () => {
    const friendId = person._id;
    try {
      const res = await followUser({ friendId });
      if (res) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const profileNavigate = () => {
    navigateToProfile(person._id,navigate);
  };
  return (
    <div className="max-w-[272px] mb-2">
      <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" onChange={profileNavigate}>
        <img
          src={baseImgUrl + picturePath}
          alt={name}
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
          onClick={profileNavigate}
        />
        <div
          className="ml-3 flex-grow cursor-pointer"
          onClick={profileNavigate}
        >
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {firstName + " " + lastName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{firstName}
          </p>
        </div>
        {person._id != localStorage.getItem("user_id") && (
          <button
            className={` px-3 py-1 rounded-full text-blue-500  dark:text-blue-400  transition-colors duration-200
            ${
              isFollowing
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
        )}
      </div>
    </div>
  );
};
