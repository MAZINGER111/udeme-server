const { Router } = require("express");
const {
  getAllResourcesHandler,
  createResourceHandler,
  getResourceHandler,
  updateHandler,
  deleteResourceHandler,
} = require("../controllers/resource");
const router = Router();

router.get("/", getAllResourcesHandler);
router.get("/:id", getResourceHandler);
router.post("/create", createResourceHandler);
router.put("/update/:id", updateHandler);
router.delete("/delete/:id", deleteResourceHandler);

module.exports = router;
