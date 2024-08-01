import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaImage,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../utils/axios";
import Loading from "../../components/Loading/Loading";
import Post from "../../components/Cards/Post";
import { baseImgUrl } from "../../constance";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
        try {
        setIsLoading(true);
        

        const userResponse = await api.get(`/users/${id}`);
        console.log("User = ", userResponse);
        const postsResponse = await api.get(`/posts/${id}/posts`);
        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
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
        </div>
      </div>

      <div className="mt-8">
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
              activeTab === "photos"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
        </div>

        {activeTab === "posts" && (
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        )}

        {activeTab === "photos" && (
          <div className="grid grid-cols-3 gap-4">
            {posts
              .filter((post) => post.picturePath)
              .map((post) => (
                <img
                  key={post._id}
                  src={post.picturePath}
                  alt="Post"
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
