const { Comment } = require("../models/comment");
const ObjectId = require("mongoose").Types.ObjectId;

const createComment = async ({ by, body, postId }) => {
  if (!by || !postId || !body) return;

  const comment = new Comment();
  comment.by = by;
  comment.postId = postId;
  comment.body = body;

  const commentInstance = await comment.save();
  if (!commentInstance) return "Error creating comment";
  return commentInstance;
};

const commentsLike = async ({ id, likesCount, action }) => {
  if (!id || !action || typeof likesCount !== "number" || likesCount < 1)
    return;

  const initalComment = await Comment.findById(id).exec();

  const likeNum =
    action === "LIKE"
      ? initalComment?.likes + likesCount
      : initalComment?.likes - likesCount;

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { likes: likeNum },
    {
      new: true,
    }
  );

  return updatedComment;
};

const getAllComments = async ({ postId }) => {
  const allComments = await Comment.find({ postId });

  return allComments;
};
module.exports = {
  createComment,
  commentsLike,
  getAllComments,
};
