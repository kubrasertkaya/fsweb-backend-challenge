exports.seed = async function (knex) {
  await knex("likes").truncate();
  await knex("comments").truncate();
  await knex("posts").truncate();
  await knex("users").truncate();

  await knex("users").insert([
    {
      user_id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "password1",
    },
    {
      user_id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      password: "password2",
    },
    {
      user_id: 3,
      username: "david_johnson",
      email: "david@example.com",
      password: "password3",
    },
  ]);

  await knex("posts").insert([
    { post_id: 1, user_id: 1, content: "İlk gönderi", like_count: 0 },
    { post_id: 2, user_id: 2, content: "İkinci gönderi", like_count: 0 },
    { post_id: 3, user_id: 3, content: "Üçüncü gönderi", like_count: 0 },
  ]);

  await knex("comments").insert([
    { comment_id: 1, user_id: 1, post_id: 1, comment: "Harika bir gönderi!" },
    { comment_id: 3, user_id: 1, post_id: 1, comment: "woww!" },
    { comment_id: 2, user_id: 3, post_id: 1, comment: "Teşekkürler!" },
  ]);

  await knex("likes").insert([
    { like_id: 1, user_id: 1, post_id: 1 },
    { like_id: 2, user_id: 2, post_id: 1 },
    { like_id: 3, user_id: 3, post_id: 2 },
  ]);
};
