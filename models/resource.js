const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = { Resource };
