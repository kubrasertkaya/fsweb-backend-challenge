exports.seed = function (knex) {
  const { NODE_ENV } = require("../../config/config");
  const config = require("../../knexfile");

  const db = knex(config[NODE_ENV]);
};
