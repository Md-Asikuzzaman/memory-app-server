import express from "express";
import {
  getAll,
  createPost,
  deletePost,
  updatePost,
  likePost,
} from "../controller/post.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAll);
router.post("/create", auth, createPost);
router.delete("/delete/:id", auth, deletePost);
router.patch("/update/:id", auth, updatePost);
router.patch("/like/:id", auth, likePost);

export default router;
