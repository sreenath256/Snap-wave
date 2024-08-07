import toast from "react-hot-toast";
import api from "./axios";
import { useDispatch } from "react-redux";
import { setRefresh } from "../redux/userSlice";

export const followUser = async ({  friendId }) => {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await api.patch(`/users/${userId}/${friendId}`);
    return response;
  } catch (error) {
    console.error("Error following user:", error);
  }
};
