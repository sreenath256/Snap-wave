import express from "express";
import {
  getUser,
  getSuggestUser,
  getUserFriends,
  getAllUsers,
  addRemoveFollow,
  searchUsers,
  savePost,
  getSavedPost,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/suggest-user/:id", verifyToken, getSuggestUser);
router.get("/get-all-users/:id", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/search/:name", verifyToken, searchUsers);
router.get("/:id/get-saved-post", verifyToken, getSavedPost);

router.post("/save-post", verifyToken, savePost);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFollow);

export default router;
