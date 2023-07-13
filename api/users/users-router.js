const router = require("express").Router();
const Users = require("./users-model.js");
const { restricted } = require("../auth/auth-middleware.js");

router.get("/", (req, res, next) => {
  Users.findUsers()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/login", restricted, async (req, res, next) => {
  const user_id = await req.decodeToken.user_id;
  Users.findUserById(user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});
module.exports = router;
