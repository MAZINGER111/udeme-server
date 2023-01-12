const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    by: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
