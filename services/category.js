const { Category } = require("../models/category");

const createCategory = async ({ name, desc }) => {
  if (!name) return;

  const category = new Category();
  if (desc) {
    category.desc = desc;
  }

  category.name = name;

  const categoryInstace = await category.save();

  if (!categoryInstace) return "Error creating category";

  return categoryInstace;
};

const getAllCategories = async () => {
  const allCategories = await Category.find({});

  return allCategories;
};

const getCategoryById = async ({ id }) => {
  if (!id || id.length !== 24) return;

  const category = await Category.findById(id).exec();
  if (!category) return "category not found";

  return category;
};

const updateCategory = async ({ id, newData }) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedCategory;
};

const deleteCategory = async ({ id }) => {
  if (!id || id.length !== 24) return "Category not found";

  const deletedData = await User.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
