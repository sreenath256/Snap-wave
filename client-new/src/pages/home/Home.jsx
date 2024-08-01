import React, { useEffect, useState } from "react";
import Post from "../../components/Cards/Post";
import api from "../../utils/axios";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refresh = useSelector((state) => state.user.refresh);

  console.log(refresh);
  
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/posts");
        setPostList(response.data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 md:w-3/4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Your Feed
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error}
          </div>
        ) : postList.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No posts to display. Follow some users to see their posts here!
          </div>
        ) : (
          <div className="space-y-6">
            {postList.map((post, index) => (
              <Post key={post.id || index} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
    
};

export default Home;