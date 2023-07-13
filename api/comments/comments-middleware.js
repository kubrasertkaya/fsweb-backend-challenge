const payloadCheck = function (req, res, next) {
  try {
    const comment = req.body.comment;
    if (!comment || comment.trim() === "") {
      res.status(400).json({ message: "İçerik gereklidir" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { payloadCheck };
