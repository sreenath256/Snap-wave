import React, { useState, useEffect } from "react";
import Post from "../../components/Cards/Post";
import api from "../../utils/axios";

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await api.get(`/users/${userId}/get-saved-post`);
        console.log(response);
        setSavedPosts(response.data.savedPost);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        setError("Failed to load saved posts. Please try again later.");
      } finally {
      }
    };

    fetchSavedPosts();
  }, []);



  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className=" dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Saved Posts</h1>
      
      {savedPosts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">No saved posts yet.</p>
      ) : (
        <div className="space-y-6">
          {savedPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;