import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

//For create post
export const create = async (req, res, next) => {
  try {
    // Check if the title already exists
    const existingTitle = await Post.findOne({ title: req.body.title });
    if (existingTitle) {
      return res.status(400).json({ error: "Post with this title already exists. Please choose a different title." });
    }
    

    // User Error handleing
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-1]/g, "");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
      newPost.image = req.body.images;
    }

    if (req.body.videos && Array.isArray(req.body.videos) && req.body.videos.length > 0) {
      newPost.video = req.body.videos;
    }

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return res.status(400).json({ error: "Post with this title already exists." });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//for like post
export const likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    post.likes = post.likes || [];
    
    const userLikedIndex = post.likes.findIndex((like) => like.userId === userId);

    if (userLikedIndex === -1) {
      post.likes.push({ userId: userId });
      post.numberOfLikes += 1;
    } else {
      post.likes.splice(userLikedIndex, 1);
      post.numberOfLikes -= 1;
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error in likePost controller:', error);
    next(errorHandler(500, 'Internal Server Error'));
  }
};

//for love post
export const lovePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    console.log('Received Post ID:', postId);
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }
    post.loves = post.loves || [];

    const userLovedIndex = post.loves.findIndex((love) => love.userId === userId);

    if (userLovedIndex === -1) {
      post.loves.push({ userId: userId });
      post.numberOfLoves += 1;
    } else {
      post.loves.splice(userLovedIndex, 1);
      post.numberOfLoves -= 1;
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error in lovePost controller:', error);
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    
    // Count only the relevant posts based on query parameters
    const totalPosts = await Post.countDocuments({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    });

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// For delete post
export const deletepost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "You are not allowed to delete posts" });
    }

    const result = await Post.findByIdAndDelete(req.params.postId);

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json("The post has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//For Update post
export const updatepost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "You are not allowed to delete posts" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          video: req.body.video,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};


// Fetch Post Details
export const getPostDetails = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    next(errorHandler(500, 'Internal Server Error'));
  }
};