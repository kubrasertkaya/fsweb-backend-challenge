const db = require("../../data/seeds/db-config");
const Posts = require("../posts/posts-model");

async function updatePostLikeCounts() {
  try {
    const results = await db("likes")
      .select("post_id")
      .count("like_id as total_likes")
      .groupBy("post_id");

    const promises = results.map(async (result) => {
      await db("posts")
        .where("post_id", result.post_id)
        .update("like_count", result.total_likes);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}

const getLiked = async function (filter) {
  const like = await db("likes as c").where(filter).first();

  return Posts.getPostById(like.post_id);
};

const likePost = async function (like) {
  const [insertedId] = await db("likes").insert(like);
  updatePostLikeCounts();
  return await getLiked({ like_id: insertedId });
};

module.exports = {
  updatePostLikeCounts,
  likePost,
  getLiked,
};
