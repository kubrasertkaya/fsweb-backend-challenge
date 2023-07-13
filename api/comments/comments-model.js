const db = require("../../data/seeds/db-config");
const Posts = require("../posts/posts-model");

const getCommented = async function (filter) {
  const comment = await db("comments as c").where(filter).first();
  return Posts.getPostById(comment.post_id);
};

const insertComment = async function (comment) {
  const [insertedId] = await db("comments").insert(comment);
  return await getCommented({ comment_id: insertedId });
};

module.exports = { insertComment, getCommented };
