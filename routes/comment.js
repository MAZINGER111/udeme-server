const { Router } = require("express");
const {
  createCommentHandler,
  commentsLikeHandler,
  getAllPostCommentsHandler,
} = require("../controllers/comment");

const router = Router();

router.get("/:postId", getAllPostCommentsHandler);
router.post("/create", createCommentHandler);
router.put("/like/:commentId", commentsLikeHandler);

module.exports = router;
