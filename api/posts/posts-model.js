const db = require("../../data/db-config");

const getPosts = async function () {
  const allPosts = await db("posts as p")
    .rightJoin("users as u", "u.user_id", "p.user_id")
    .select(
      "p.post_id",
      "p.content",
      "u.user_id",
      "u.username",
      "p.created_at"
    );
  return allPosts;
};
async function getPostById(post_id) {
  const post = await db("posts as p")
    .join("users as u", "u.user_id", "p.user_id")
    .join("comments as c", "c.post_id", "p.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select(
      "u.user_id",
      "u.username",
      "p.post_id",
      "p.content",
      "p.created_at",
      "c.user_id",
      "c.post_id"
    )
    .where("p.post_id", post_id)
    .first();

  const comments = await db("comments as c")
    .rightJoin("users as u", "u.user_id", "c.user_id")
    .select("c.*", "u.username")
    .where("c.post_id", post_id);
  if (!post || post.length === 0) {
    return [];
  }
  const postModel = post;
  postModel.comments = comments;
  return postModel;
}

const insertPost = async function (post) {
  const [insertedId] = await db("posts").insert(post);
  return await getPostById(insertedId);
};
const remove = async function (post_id) {
  return db("posts").where("post_id", post_id).del();
};

module.exports = { insertPost, getPostById, getPosts, remove };
