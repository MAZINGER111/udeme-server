const { Router } = require("express");
const {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectHandler,
  updateHandler,
  deleteProjectHandler,
  subscribeToProject,
} = require("../controllers/project");

const router = Router();

router.get("/", getAllProjectsHandler);
router.get("/project/:id", getProjectHandler);
router.post("/create", createProjectHandler);
router.post("/subscribe", subscribeToProject);
router.put("/project/update/:id", updateHandler);
router.delete("/project/delete/:id", deleteProjectHandler);

module.exports = router;
