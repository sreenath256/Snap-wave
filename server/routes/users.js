import express from "express";
import {
  getUser,
  getSuggestUser,
  getUserFriends,
  getAllUsers,
  addRemoveFollow,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/suggest-user/:id", verifyToken, getSuggestUser);
router.get("/get-all-users/:id", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFollow);

export default router;
