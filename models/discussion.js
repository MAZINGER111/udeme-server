const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    featuredImage: { type: String, required: true },
    desc: { type: String, required: true },
    likes: { type: Number, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = { Discussion };
