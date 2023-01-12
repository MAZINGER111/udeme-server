const { Router } = require("express");
const {
  createReportHandler,
  getReportHandler,
  approveReportHandler,
  rejectReportHandler,
  getAllReportsHandler,
} = require("../controllers/report");

const router = Router();

router.get("/", getAllReportsHandler);
router.get("/report/:id", getReportHandler);
router.post("/create", createReportHandler);
router.put("/aprove/:id", approveReportHandler);
router.delete("/reject/:id", rejectReportHandler);

module.exports = router;
