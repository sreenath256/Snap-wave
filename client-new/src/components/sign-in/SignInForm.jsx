import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../../redux/userSlice";
const SignInForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(10).required("Password is required"),
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
      // Send a POST request with Axios
      const response = await api.post("auth/login", data);

      // Handle the response as needed
      toast.success("Login successful!");
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
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="login_email"
          id="login_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("email")}
        />
        <p className="w-full h-5 text-xs text-red-500">
          {errors.email?.message}
        </p>
        <label
          htmlFor="login_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="login_password"
          id="login_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("password")}
        />
        <p className="w-full h-5 text-xs text-red-500">
          {errors.password?.message}
        </p>
        <label
          htmlFor="login_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  );
};

export default SignInForm;
