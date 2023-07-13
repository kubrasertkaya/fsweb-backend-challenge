const db = require("../../data/seeds/db-config");

async function findUsers() {
  const allUsers = await db("users as u").select(
    "u.user_id",
    "u.username",
    "u.email"
  );
  return allUsers; //[....]
}
async function findUserBy(filter) {
  const user = await db("users as u").where(filter).first();
  return user; //{....}
}

async function findUserById(user_id) {
  const user = await db("users as u")
    .leftJoin("posts as p", "p.user_id", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "u.email",
      "u.password",
      "p.post_id",
      "p.content"
    )
    .where("u.user_id", user_id)
    .first();
  return user;
}
const insertUser = async function (user) {
  const [insertedId] = await db("users").insert(user);
  return await findUserBy({ user_id: insertedId });
};
module.exports = { findUsers, findUserBy, findUserById, insertUser };
