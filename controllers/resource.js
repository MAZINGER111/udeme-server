const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../services/resource");

const getAllResourcesHandler = async (req, res) => {
  const resources = await getAllResources();
  return res.json({ success: true, resources });
};

const createResourceHandler = async (req, res) => {
  const { name, date, localState, url } = req.body;

  if (!name || !date || !localState || !url)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const resourceOrError = await createResource({ name, date, localState, url });

  return res.send({
    status: typeof resourceOrError !== "string" ? "OK" : "Error",
    resource: resourceOrError,
  });
};

const getResourceHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid category id" });

  const resourceOrError = await getResourceById({ id });
  return res.send({
    status: typeof resourceOrError !== "string" ? "OK" : "Error",
    user: resourceOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid resource id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const resourceOrError = await updateResource({ id, newData });

  return res.send({
    status: typeof resourceOrError !== "string" ? "OK" : "Error",
    user: resourceOrError,
  });
};

const deleteResourceHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid resource id" });

  const deteledInstance = await deleteResource({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Resource not found" : "Resource deleted",
  });
};

module.exports = {
  getAllResourcesHandler,
  createResourceHandler,
  getResourceHandler,
  updateHandler,
  deleteResourceHandler,
};
