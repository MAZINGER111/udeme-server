const { Router } = require("express");
const {
  getAllCategoriesHandler,
  createCategoryHandler,
  getCategoryHandler,
  updateHandler,
  deleteCategoryHandler,
} = require("../controllers/category");
const router = Router();

router.get("/", getAllCategoriesHandler);
router.get("/:id", getCategoryHandler);
router.post("/create", createCategoryHandler);
router.put("/update/:id", updateHandler);
router.delete("/delete/:id", deleteCategoryHandler);

module.exports = router;
