const router = require("express").Router();
const Comments = require("./comments-model");
const { payloadCheck } = require("./comments-middleware");
const mw = require("../auth/auth-middleware");

router.post(
  "/:post_id",
  mw.restricted,
  payloadCheck,
  async (req, res, next) => {
    try {
      const user_id = await req.decodeToken.user_id;
      const postId = req.params.post_id;

      const model = {
        comment: req.body.comment,
        user_id: user_id,
        post_id: postId,
      };
      const insertedRecord = await Comments.insertComment(model);
      res.status(201).json(insertedRecord);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
