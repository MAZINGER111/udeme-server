const {
  createProject,
  getAllProjects,
  updateProject,
  getProjectById,
  deleteProject,
} = require("../services/project");

const createProjectHandler = async (req, res) => {
  const { title, featuredImage, type, createdBy, body } = req.body;

  if (!title || !type || !featuredImage || !createdBy || !body)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const projectOrError = await createProject({
    title,
    featuredImage,
    type,
    createdBy,
    body,
  });

  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const getAllProjectsHandler = async (req, res) => {
  const page = req.query.page || 1;
  const postPerPage = 12;

  const { projects, totalCount } = await getAllProjects(page, postPerPage);
  const pageCount = Math.floor(totalCount / postPerPage);

  return res.json({
    success: true,
    projects,
    pagination: {
      totalCount,
      pageCount,
      currentPage: Number(page),
    },
  });
};

const getProjectHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  const projectOrError = await getProjectById({ id });
  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const projectOrError = await updateProject({ id, newData });

  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const deleteProjectHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  const deteledInstance = await deleteProject({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Project not found" : "Project deleted",
  });
};

module.exports = {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectHandler,
  updateHandler,
  deleteProjectHandler,
};
