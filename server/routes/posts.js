import express from "express";
import { createComment, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.post('/:postId/comment', verifyToken, createComment);


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
