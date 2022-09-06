import Post from "../model/postSchema.js";
// Fetch all posts
export const getAll = async (req, res) => {
  try {
    const data = await Post.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = new Post({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
  }
};

// Delete a post by ID

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const delData = await Post.findByIdAndDelete(id);
    res.status(200).json(delData);
  } catch (error) {
    console.log(error.message);
  }
};

// Update a post by ID

export const updatePost = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const updates = await Post.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updates);
  } catch (error) {
    console.log(error.message);
  }
};

// like a post by ID

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId)
      return res.status(404).json({ message: "Unauthenticated" });

    let post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // likes the post
      post.likes.push(req.userId);
    } else {
      // dislike the post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedData = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error.message);
  }
};
