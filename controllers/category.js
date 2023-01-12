const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/category");

const getAllCategoriesHandler = async (req, res) => {
  const categories = await getAllCategories();
  return res.json({ success: true, categories });
};

const createCategoryHandler = async (req, res) => {
  const { name, desc } = req.body;

  if (!name)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  let data = { name };
  if (desc) {
    data.desc = desc;
  }

  const categoryOrError = await createCategory(data);

  return res.send({
    status: typeof categoryOrError !== "string" ? "OK" : "Error",
    user: categoryOrError,
  });
};

const getCategoryHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid category id" });

  const categoryOrError = await getCategoryById({ id });
  return res.send({
    status: typeof categoryOrError !== "string" ? "OK" : "Error",
    user: categoryOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid category id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const categoryOrError = await updateCategory({ id, newData });

  return res.send({
    status: typeof categoryOrError !== "string" ? "OK" : "Error",
    user: categoryOrError,
  });
};

const deleteCategoryHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid category id" });

  const deteledInstance = await deleteCategory({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Category not found" : "Category deleted",
  });
};

module.exports = {
  getAllCategoriesHandler,
  createCategoryHandler,
  getCategoryHandler,
  updateHandler,
  deleteCategoryHandler,
};
