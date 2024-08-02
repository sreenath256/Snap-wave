import { useNavigate } from "react-router-dom";

export const navigateToProfile = (id,navigate) => {
  navigate(`/profile/${id}`);
};
