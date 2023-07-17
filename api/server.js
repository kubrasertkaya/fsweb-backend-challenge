// 1.importlarım

const express = require("express");
const server = express();
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// 2.global middleware'larım
server.use(helmet()); // 3rd-party middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json()); //build-in middleware

// 3.routerlarım
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");
const postRouter = require("./posts/posts-router");
const commentRouter = require("./comments/comments-router");
const LikeRouter = require("../api/likes/likes-router");

server.get("/", (req, res) => {
  res.json({ message: "Server up and running...." }); //test amaçlı bir endpoint yazdık.
});

// 4.ERROR middleware

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);
server.use("/api/likes", LikeRouter);

server.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error!.... " });
});
// 5.export

module.exports = server;
