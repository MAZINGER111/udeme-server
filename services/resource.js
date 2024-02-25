const { Resource } = require("../models/resource");

const createResource = async ({ name, date, localState, url }) => {
  if (!name || !date || !localState || !url || !desc || !featuredImage) return;

  const resource = new Resource();
  resource.name = name;
  resource.date = date;
  resource.localState = localState;
  resource.url = url;
  resource.desc = desc;
  resource.featuredImage = featuredImage;

  const resourceInstace = await resource.save();
  if (!resourceInstace) return "Error creating resource";

  return resourceInstace;
};

const getAllResources = async () => {
  const allResources = await Resource.find({});

  return allResources;
};

const getResourceById = async ({ id }) => {
  if (!id || id.length !== 24) return;

  const resource = await Resource.findById(id).exec();
  if (!resource) return "Resource not found";

  return resource;
};

const updateResource = async ({ id, newData }) => {
  const updatedResource = await Resource.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedResource;
};

const deleteResource = async ({ id }) => {
  if (!id || id.length !== 24) return "Resource not found";

  const deletedData = await Resource.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
