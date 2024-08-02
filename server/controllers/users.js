import mongoose from "mongoose";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const ourUserId = req.params.id;

    // Find the current user to get the list of users they are following
    const users = await User.find({
      _id: { $ne: mongoose.Types.ObjectId(ourUserId) },
    });

    res.json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSuggestUser = async (req, res) => {
  try {
    const ourUserId = req.params.id;

    // Find the current user to get the list of users they are following
    const currentUser = await User.findById(ourUserId).populate(
      "following",
      "_id"
    );
    const followingIds = currentUser.following.map((user) => user._id);

    // Add the current user's ID to the list of IDs to exclude
    followingIds.push(mongoose.Types.ObjectId(ourUserId));

    // Fetch 5 random users excluding the specified user and the users they follow
    const randomUsers = await User.aggregate([
      { $match: { _id: { $nin: followingIds } } }, // Exclude the specific user and users they follow
      { $sample: { size: 5 } }, // Randomly sample 5 documents
    ]);

    res.json(randomUsers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { name } = req.params;

    const query = {
      $or: [
        { firstName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ],
    };

    const users = await User.find(query).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getSavedPost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate({
        path: 'savedPost',
        populate: [
          {
            path: 'userId',
            select: 'firstName lastName picturePath followers',
          },
          {
            path: 'comments',
            populate: {
              path: 'userId',
              select: 'firstName lastName picturePath',
            },
          }
        ]
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFollow = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.following.includes(friendId)) {
      user.following = user.following.filter(
        (followingId) => followingId.toString() !== friendId
      );
      friend.followers = friend.followers.filter(
        (followerId) => followerId.toString() !== id
      );
    } else {
      user.following.push(friendId);
      friend.followers.push(id);
    }

    await user.save();
    await friend.save();

    const following = await Promise.all(
      user.following.map((followingId) => User.findById(followingId))
    );

    const formattedFriends = following.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user ) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedPost.includes(postId)) {
      user.savedPost = user.savedPost.filter(
        (savedPostid) => savedPostid.toString() !== postId
      );
      
    } else {
    
      user.savedPost.push(postId);
    }


    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
