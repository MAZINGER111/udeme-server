const { Discussion } = require("../models/discussion");
const { Project } = require("../models/project");
const ObjectId = require("mongoose").Types.ObjectId;

const createProject = async ({
  title,
  featuredImage,
  type,
  createdBy,
  body,
  states,
}) => {
  if (!title || !featuredImage || !type || !createdBy || !body || !states)
    return;

  const project = new Project();
  project.title = title;
  project.featuredImage = featuredImage;
  project.body = body;
  project.type = type;
  project.createdBy = createdBy;
  project.states = states;

  const projectInstace = await project.save();

  if (!projectInstace) return "Error creating project";

  const discussion = new Discussion();
  discussion.title = title;
  discussion.featuredImage = featuredImage;
  discussion.desc = body;
  discussion.likes = 0;
  discussion.postId = project._id;

  await discussion.save();

  return projectInstace;
};

const getAllProjects = async (page, postPerPage, isAdmin) => {
  const totalCount = await Project.estimatedDocumentCount({});

  let allProjects;
  if (isAdmin) {
    allProjects = await Project.find({});
  } else {
    allProjects = await Project.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * postPerPage)
      .limit(postPerPage);
  }

  return { projects: allProjects, totalCount };
};

const getProjectById = async ({ id }) => {
  if (!id) return;

  const project = await Project.findById(id).exec();
  if (!project) return "project not found";

  return project;
};

const updateProject = async ({ id, newData }) => {
  const updatedProject = await Project.findByIdAndUpdate(id, newData, {
    new: true,
  });

  if (newData.title) {
    await Discussion.findOneAndUpdate(
      { postId: new ObjectId(id) },
      { title: newData.title }
    );
  }

  return updatedProject;
};

const deleteProject = async ({ id }) => {
  if (!id) return "Project not found";

  const deletedData = await Project.deleteOne({ _id: id });
  await Discussion.deleteOne({ postId: new ObjectId(id) });
  return deletedData.deletedCount;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
