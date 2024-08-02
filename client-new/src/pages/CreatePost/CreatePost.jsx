import React, { useEffect, useState } from "react";
import { FaImage, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import api from "../../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);

  const navigate=useNavigate();
  
  const schema = yup.object().shape({
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),

    // picture: yup
    // .mixed()
    // .required("A picture is required")
    //   .test(
    //     "fileSize",
    //     "Upload file properly",
    //     (value) => value && value[0]?.size <= 2 * 1024 * 1024
    //   ) // 2MB
    //   .test(
    //     "fileType",
    //     "Unsupported file format",
    //     (value) =>
    //       value &&
    //     ["image/jpg", "image/jpeg", "image/png"].includes(value[0]?.type)
    //   ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("user_id");
      const combinedData = { ...data, picture, userId };

      // Send a POST request with Axios
      const response = await api.post("posts", combinedData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      toast.success("Post uploaded successful!");

      navigate("/home");
    } catch (error) {
      toast.error(error);
      console.error("Error during form submission:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };


  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Create Post
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              {image ? (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FaImage className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Click to upload an image
                  </p>
                </div>
              )}
            </div>
            <p className="w-full h-5 text-xs pt-2 text-red-500"></p>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Write a caption..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="3"
            {...register("description")}
          ></textarea>
          <p className="w-full h-5 text-xs text-red-500">
            {errors.description?.message}
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Add location"
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            {...register("location")}
          />
        </div>
        <p className="w-full h-5 text-xs text-red-500">
          {errors.location?.message}
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
