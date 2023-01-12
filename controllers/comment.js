const {
  createComment,
  commentsLike,
  getAllComments,
} = require("../services/comment");

const getAllPostCommentsHandler = async (req, res) => {
  const { postId } = req.params;
  if (!postId || postId.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid post id" });

  const comments = await getAllComments({ postId });
  return res.json({ success: true, comments });
};

const createCommentHandler = async (req, res) => {
  const { by, postId, body } = req.body;

  if (!by || !postId || !body)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const commentOrError = await createComment({
    by,
    postId,
    body,
  });

  return res.send({
    status: typeof commentOrError !== "string" ? "OK" : "Error",
    comment: commentOrError,
  });
};

const commentsLikeHandler = async (req, res) => {
  const { commentId } = req.params;
  const { likesCount, action } = req.body;

  if (!commentId || !likesCount || !action)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  if (action !== "LIKE" || action !== "DISLIKE")
    return res.status(406).send({
      status: "Error",
      message: "Invalid like action, action should be 'LIKE' or 'DISLIKE'",
    });

  const commentOrError = await commentsLike({
    id: commentId,
    likesCount,
    action,
  });

  return res.send({
    status: typeof commentOrError !== "string" ? "OK" : "Error",
    comment: commentOrError,
  });
};

module.exports = {
  createCommentHandler,
  commentsLikeHandler,
  getAllPostCommentsHandler,
};
