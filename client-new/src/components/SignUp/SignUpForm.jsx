import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../../redux/userSlice";

const SignUpForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(10).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .required("Phone number is required"),
    occupation: yup.string().required("Occupation is required"),
    picture: yup
      .mixed()
      .required("A picture is required")
      .test(
        "fileSize",
        "The file is too large",
        (value) => value && value[0]?.size <= 2 * 1024 * 1024
      ) // 2MB
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value[0]?.type)
      ),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      // Create a FormData object
      const formData = new FormData();

      // Append all form fields to the FormData object
      Object.keys(data).forEach((key) => {
        if (key === "picture") {
          formData.append(key, data[key][0]); // Append the file itself
        } else {
          formData.append(key, data[key]);
        }
      });

      // Send a POST request with Axios
      const response = await api.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      // Handle the response as needed
      toast.success("Registration successful!");
      if (response) {
        dispatch(setUserId(response.data.user._id));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user._id);
        dispatch(setToken(response.data.token));

        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("email")}
        />
        <p className="w-full h-5 text-xs text-red-500">
          {errors.email?.message}
        </p>
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("password")}
        />
        <p className="w-full h-5 text-xs text-red-500">
          {errors.password?.message}
        </p>
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      {/* Confirm Password Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="confirmPassword"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("confirmPassword")}
        />
        <p className="w-full h-5 text-xs text-red-500">
          {errors.confirmPassword?.message}
        </p>
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>

      {/* First Name Field */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="firstName"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("firstName")}
          />
          <p className="w-full h-5 text-xs text-red-500">
            {errors.firstName?.message}
          </p>
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>

        {/* Last Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastName"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("lastName")}
          />
          <p className="w-full h-5 text-xs text-red-500">
            {errors.lastName?.message}
          </p>
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>

      {/* Phone Field */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("phone")}
          />
          <p className="w-full h-5 text-xs text-red-500">
            {errors.phone?.message}
          </p>
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
        </div>

        {/* Occupation Field */}
        <div className="relative z-0 w-full mb-7 group">
          <input
            type="text"
            name="occupation"
            id="floating_company"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("occupation")}
          />
          <p className="w-full h-5 text-xs text-red-500">
            {errors.occupation?.message}
          </p>
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Occupation
          </label>
        </div>
      </div>

      {/* Picture Upload Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="picture"
          id="floating_picture"
          className="block w-full text-xs  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("picture")}
        />
        <p className="w-full h-5  text-xs text-red-500">
          {errors.picture?.message}
        </p>
        <label
          htmlFor="floating_picture"
          className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Profile picture
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
