const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    featuredImage: { type: String, required: true },
    type: { type: String, required: true },
    createdBy: { type: String, required: true },
    body: { type: String, required: true },
    states: { type: [String], required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
