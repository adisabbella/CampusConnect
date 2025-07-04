const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    req.body.likes = 0;
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    res.status(400).json({ error: 'Validation failed', details: err.message });
  }
}

const viewPost =  async(req, res) => {
  try {
    const { sortBy, tags, page, mine } = req.query;

    let sortOption = {};
    if (sortBy === "recent") sortOption = { createdAt: -1 };
    else if (sortBy === "mostlikes") sortOption = { likes: -1 };

    let filter = {};
    if (mine === "true") filter.authorId = req.user.id;
    if (tags) {
      const tagsArray = tags.split(",");
      filter.tags = { $in: tagsArray };
    }
    
    const limit = 10;
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);
    const currentPage = Math.max(1, Math.min((parseInt(page)) || 1, totalPages || 1)); 
    const skip = (currentPage - 1) * limit;
    
    const requiredPosts = await Post.find(filter).sort(sortOption).skip(skip).limit(limit);
    res.json({
      posts: requiredPosts,
      totalPosts,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    });
  }
  catch {
    res.status(500).json({ message: 'Server Error' });
  }
}

const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const toBeDeleted = await Post.findById(req.params.id);
    if (!toBeDeleted) return res.status(404).json({ error: 'Post not found' });
    if (userId !== toBeDeleted.authorId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await toBeDeleted.deleteOne();
    res.status(204).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const editPost = async(req, res) => {
  try {
    const {title, content, tags} = req.body;
    const postId = req.params.id;
    const userId = req.user.id;
    const toBeEdited = await Post.findById(postId);
    if (!toBeEdited) return res.status(404).json({ error: 'Post not found' });
    if (userId !== toBeEdited.authorId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (title) toBeEdited.title = title;
    if (content) toBeEdited.content = content;
    if (tags) toBeEdited.tags = tags;
    await toBeEdited.save();
    res.status(200).json({message: "Edited Successfully!",
      post: toBeEdited
    });
  }
  catch {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = { createPost, viewPost, deletePost, editPost };