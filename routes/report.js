const { Router } = require("express");
const {
  createReportHandler,
  getReportHandler,
  approveReportHandler,
  rejectReportHandler,
  getAllReportsHandler,
  deleteReportHandler,
} = require("../controllers/report");

const router = Router();

router.get("/", getAllReportsHandler);
router.get("/report/:id", getReportHandler);
router.post("/create", createReportHandler);
router.put("/aprove/:id", approveReportHandler);
router.put("/reject/:id", rejectReportHandler);
router.delete("/report/:id", rejectReportHandler);

module.exports = router;
