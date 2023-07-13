const router = require("express").Router();
const Likes = require("./likes-model");
const mw = require("../auth/auth-middleware");

router.post("/:post_id", mw.restricted, async (req, res, next) => {
  try {
    const user_id = await req.decodeToken.user_id;
    const postId = req.params.post_id;

    const model = {
      user_id: user_id,
      post_id: postId,
    };
    const insertedRecord = await Likes.likePost(model);
    res.status(201).json(insertedRecord);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
