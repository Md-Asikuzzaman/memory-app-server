import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/auth", userRoutes);

// api endpoint

// db connection
mongoose.connect("mongodb://localhost/Post", () => {
  // listener
  app.listen(port, () => {
    console.log("Server is running...");
  });
});
