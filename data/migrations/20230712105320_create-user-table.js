/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("posts", (table) => {
      table.increments("post_id").primary();
      table
        .integer("user_id") //foreign key
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.string("content").notNullable();
      table.integer("like_count").defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable("comments", (table) => {
      table.increments("comment_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table
        .integer("post_id")
        .unsigned()
        .references("post_id")
        .inTable("posts");
      table.string("comment").notNullable();
      table.timestamps(true, true);
    })
    .createTable("likes", (table) => {
      table.increments("like_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table
        .integer("post_id")
        .unsigned()
        .references("post_id")
        .inTable("posts");
      table.timestamps(true, true);
      table.primary(["user_id", "post_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("likes")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
