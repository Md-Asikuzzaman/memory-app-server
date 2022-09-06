import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  name: String,
  creator: String,

  tags: {
    type: [String],
    required: true,
  },

  selectedFile: {
    type: String,
    required: true,
  },

  likes: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.model("Post", postSchema);

export default Post;
