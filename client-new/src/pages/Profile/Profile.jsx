import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaImage,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaUserCheck,
  FaUserPlus,
  FaSpinner,
} from "react-icons/fa";
import api from "../../utils/axios";
import Loading from "../../components/Loading/Loading";
import Post from "../../components/Cards/Post";
import { baseImgUrl } from "../../constance";
import { Link, useParams } from "react-router-dom";
import { PeopleCard } from "../../components/Cards/PeopleCard";
import { followUser } from "../../utils/followUser";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState();

  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        const userResponse = await api.get(`/users/${id}`);
        const postsResponse = await api.get(`/posts/${id}/posts`);
        console.log(userResponse);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
        if (
          userResponse.data.followers.some(
            (item) => item._id === localStorage.getItem("user_id")
          )
        ) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
    <FaSpinner className="animate-spin text-center text-4xl text-blue-500 dark:text-blue-400" />
  </div>
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-4  ">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-48 bg-blue-500">
          <img
            src={`${baseImgUrl}${user.coverPicture || user.picturePath}`}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative px-4 py-16">
          <div className="absolute -top-16 left-4">
            <img
              src={
                baseImgUrl + user.picturePath ||
                "https://via.placeholder.com/150"
              }
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="mr-4 mb-2">
              <FaMapMarkerAlt className="inline mr-1 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {user.location || "Not specified"}
              </span>
            </div>
            <div className="mr-4 mb-2">
              <FaBriefcase className="inline mr-1 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {user.occupation || "Not specified"}
              </span>
            </div>
            <div className="mr-4 mb-2">
              <FaCalendarAlt className="inline mr-1 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {user.bio || "No bio available"}
          </p>
          <div className="flex space-x-4 mb-4">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {posts.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {user.followers?.length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">
                {user.following?.length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>
          {user._id != localStorage.getItem("user_id") ? (
            <button
              onClick={handleFollowToggle}
              className={` px-5 py-1 mt-2 rounded-xl text-base font-medium ${
                isFollowing
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
          ) : (
            <button className="px-5 py-1 mt-2 rounded-xl text-base font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <Link to="/edit-profile">Edit profile</Link>
            </button>
          )}
        </div>
      </div>

      <div className="mt-8  pb-40 ">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`pb-2 px-4 ${
              activeTab === "posts"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "followers"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "following"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {activeTab === "posts" && (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto text-center">
                <p className="text-gray-800 dark:text-gray-200">No posts yet</p>
              </div>
            ) : (
              posts.map((post) => <Post key={post._id} post={post} />)
            )}
          </div>
        )}

        {activeTab === "followers" && (
          <div className="space-y-4">
            {user.followers.length === 0 ? (
              <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto text-center">
                <p className="text-gray-800 dark:text-gray-200">
                  No followers yet
                </p>
              </div>
            ) : (
              user.followers.map((followers) => (
                <PeopleCard key={followers._id} person={followers} />
              ))
            )}
          </div>
        )}
        {activeTab === "following" && (
          <div className="space-y-4">
            {user.following.length === 0 ? (
              <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto text-center">
                <p className="text-gray-800 dark:text-gray-200">
                  No following yet
                </p>
              </div>
            ) : (
              user.following.map((following) => (
                <PeopleCard key={following._id} person={following} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
