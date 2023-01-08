const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    featuredImage: { type: String, required: true },
    createdBy: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
