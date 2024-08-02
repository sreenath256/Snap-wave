import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaBookmark,
  FaComment,
  FaPaperPlane,
  FaUserPlus,
  FaUserCheck,
} from "react-icons/fa";
import { baseImgUrl } from "../../constance";
import { formatTimestamp } from "../../utils/formateTimeStamp";
import api from "../../utils/axios";
import CommentCard from "../Comment/CommentCard";
import { Link } from "react-router-dom";
import { followUser } from "../../utils/followUser";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../redux/userSlice";

const Post = ({ post }) => {
  const { userId, createdAt, location, picturePath, description } = post;
  const [user, setUser] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post.userId.followers.includes(localStorage.getItem("user_id"))) {
      setIsFollowing(true);
    }
    const fetchUser = async () => {
      const myUserId = localStorage.getItem("user_id");
      const response = await api.get(`/users/${myUserId}`);
      console.log(response);
      if (response.data.savedPost.includes(post._id)) {
        setIsSaved(true);
      }

    };
    fetchUser();
    setUser(post.userId);
    setComments(post.comments);
    setLikeCount(Object.keys(post.likes).length);
    setCommentCount(Object.keys(post.comments).length);
    setIsLiked(post.likes.hasOwnProperty(localStorage.getItem("user_id")));
  }, [post]);

  const handleLike = () => {
    api
      .patch(`/posts/${post._id}/like`, {
        userId: localStorage.getItem("user_id"),
      })
      .then((res) => console.log(res));
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (commentInput.trim() === "") return;

    try {
      const response = await api.post(`posts/${post._id}/comment`, {
        content: commentInput,
        userId: localStorage.getItem("user_id"),
      });

      setCommentInput("");
      setComments((prevComments) => [
        ...prevComments,
        response.data.newComment,
      ]);
      setCommentCount(commentCount + 1);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFollowToggle = async () => {
    const friendId = user._id;
    try {
      const res = await followUser({ friendId });
      if (res) {
        setIsFollowing(!isFollowing);
        dispatch(setRefresh());
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const handleSavePost = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const postId = post._id;

      const response = await api.post("users/save-post", { userId, postId });
      if(response){
        setIsSaved(!isSaved)
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto relative">
      {userId._id !== localStorage.getItem("user_id") && (
        <button
          onClick={handleFollowToggle}
          className={`absolute top-8 right-2 px-3 py-1 rounded-full text-sm font-medium ${
            isFollowing
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          } transition-colors duration-200`}
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

      <Link to={`/profile/${post.userId._id}`}>
        <div className="flex items-center mb-4">
          <img
            src={
              baseImgUrl + user.picturePath ||
              "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
            }
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="ml-4">
            <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {formatTimestamp(createdAt)} • {location}
            </div>
          </div>
        </div>
      </Link>

      {description && (
        <div className="mb-4 text-gray-800 dark:text-gray-200">
          <p className={`${isExpanded ? "" : "line-clamp-1"}`}>{description}</p>
          {description.length > 80 && (
            <button
              onClick={toggleReadMore}
              className="text-blue-500 hover:text-blue-600 text-sm mt-1 focus:outline-none"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      )}

      <div className="mb-4 rounded-lg overflow-hidden">
        <img
          src={baseImgUrl + picturePath}
          alt="Post"
          className="w-full h-auto max-h-96 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            } hover:text-red-500 transition-colors duration-200`}
          >
            <FaHeart className="text-xl" />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={handleCommentToggle}
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            <FaComment className="text-xl" />
            <span>{commentCount}</span>
          </button>
        </div>
        <button
          onClick={handleSavePost}
          className={`transition-colors duration-200 ${
            isSaved ? "text-yellow-600" : "text-gray-500 dark:text-gray-400 hover:text-yellow-500"
          } `  }
        >
          <FaBookmark className="text-xl" />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showComments ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mb-4 max-h-40 overflow-y-auto">
          {comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
