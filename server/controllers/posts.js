import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, location } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(409).json({ message: "User not found" });
    }
    const picturePath = `/assets/${req.file.filename}`;

    const newPost = new Post({
      userId,

      location,
      description,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    console.log("From getfeed posts");
    const posts = await Post.find()
      .populate({
        path: "userId", // Populate the userId in the Post model
        select: "firstName lastName picturePath", // Adjust fields as needed
      })
      .populate({
        path: "comments", // Populate the comments field
        populate: {
          path: "userId", // Populate the userId inside each comment
          select: "firstName lastName picturePath", // Adjust fields as needed
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error retrieving posts:", err);
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({userId})
    .populate({
      path: "userId", // Populate the userId in the Post model
      select: "firstName lastName picturePath", // Adjust fields as needed
    })
    .populate({
      path: "comments", // Populate the comments field
      populate: {
        path: "userId", // Populate the userId inside each comment
        select: "firstName lastName picturePath", // Adjust fields as needed
      },
    })
    .sort({ createdAt: -1 })
    .exec();    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const { content, userId } = req.body;

    const newComment = new Comment({
      content,
      userId,
    });

    const savedComment = await newComment.save();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate({
      path: "comments",
      populate: {
        path: "userId",
        model: "User",
        select: "firstName lastName", // Adjust as needed
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Find and return the newly added comment with populated user details
    const populatedComment = await Comment.findById(savedComment._id).populate(
      "userId",
      "firstName lastName picturePath"
    );

    res.status(200).json({ post, newComment: populatedComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
