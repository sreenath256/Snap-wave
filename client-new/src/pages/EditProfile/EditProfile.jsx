import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    occupation: "",
    picturePath: "",
    coverPicture: "",
    bio: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await api.get(`/users/${userId}`);
        const {
          firstName,
          lastName,
          occupation,
          bio,
          location,
          picturePath,
          coverPicture,
        } = response.data;
        setUserData({
          firstName,
          lastName,
          occupation,
          bio,
          location,
          picturePath,
          coverPicture,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", userData);
    try {
      setLoading(true);
      const userId = localStorage.getItem("user_id");
      const combainedData = { ...userData, userId };

      const response = await api.patch("/edit-profile", combainedData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log("Response", response);
      if (response) {
        toast.success("Profile Updated");
        navigate(`/profile/${response.data._id}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };

  return (
    <div className=" max-w-2xl mx-auto mt-10  p-6 bg-white  dark:bg-gray-800  rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Edit Profile
      </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required={true}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required={true}
            />
          </div>
        </div>

        <input
          type="text"
          name="occupation"
          value={userData.occupation}
          onChange={handleChange}
          placeholder="Occupation"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          required={true}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="picturePath"
            onChange={handleFileChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover Picture
          </label>
          <input
            type="file"
            name="coverPicture"
            onChange={handleFileChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
        <textarea
          name="bio"
          value={userData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          rows="2"
        ></textarea>
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
