const Post = require("../models/postModel");
const Like = require("../models/likeModel");

const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      await Like.deleteOne({ userId, postId });
      const updated = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 0 } },
        { new: true } 
      );
      return res.status(200).json({ message: 'Post unliked', likes: updated.likes });
    } else {
      try {
        await Like.create({ userId, postId });
        const updated = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: +1 } },
          { new: true } 
        );
        return res.status(200).json({ message: 'Post liked', likes: updated.likes });
      } catch (err) {
        if (err.code === 11000) {
          return res.status(200).json({ message: 'Already liked' });
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.error('Error in toggleLike:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { toggleLike };
