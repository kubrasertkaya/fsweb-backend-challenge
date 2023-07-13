const router = require("express").Router();
const { payloadCheck, checkOwnPost } = require("./posts-middleware");
const Posts = require("./posts-model");
const mw = require("../auth/auth-middleware");

router.get("/", mw.restricted, (req, res, next) => {
  Posts.getPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

router.get("/:post_id", mw.restricted, (req, res, next) => {
  Posts.getPostById(req.params.post_id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});
router.post("/add", mw.restricted, payloadCheck, async (req, res, next) => {
  try {
    const user_id = await req.decodeToken.user_id;

    const model = {
      content: req.body.content,
      user_id: user_id,
    };
    const insertedRecord = await Posts.insertPost(model);
    res.status(201).json(insertedRecord);
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/del/:post_id",
  mw.restricted,
  checkOwnPost,
  async (req, res, next) => {
    let deleted = await Posts.getPostById(req.params.post_id);
    try {
      if (deleted) {
        await Posts.remove(req.params.post_id);
        res.json({ message: "Post silindi" });
      } else {
        next({ status: 404, message: "Böyle bir post yok" });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
