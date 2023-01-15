const {
  createReport,
  getReportById,
  approveReport,
  rejectReport,
  getAllReports,
} = require("../services/report");

const getAllReportsHandler = async (req, res) => {
  const reports = await getAllReports();
  return res.json({ success: true, reports });
};

const createReportHandler = async (req, res) => {
  const {
    projectName,
    status,
    state,
    address,
    lga,
    desc,
    images,
    submittedBy,
  } = req.body;

  if (
    !projectName ||
    !status ||
    !state ||
    !address ||
    !lga ||
    !desc ||
    !submittedBy.fullname ||
    !submittedBy.email
  )
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  let data = {
    projectName,
    status,
    state,
    address,
    lga,
    desc,
    submittedBy,
  };

  if (images) {
    data.images = images;
  }

  const reportOrError = await createReport(data);

  return res.send({
    status: typeof reportOrError !== "string" ? "OK" : "Error",
    report: reportOrError,
  });
};

const getReportHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid report id" });

  const reportOrError = await getReportById({ id });
  return res.send({
    status: typeof reportOrError !== "string" ? "OK" : "Error",
    report: reportOrError,
  });
};

const approveReportHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid report id" });

  const reportOrError = await approveReport({ id });
  return res.send({
    status: typeof reportOrError !== "string" ? "OK" : "Error",
    report: reportOrError,
  });
};

const rejectReportHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid report id" });

  const reportOrError = await rejectReport({ id });
  return res.send({
    status: typeof reportOrError !== "string" ? "OK" : "Error",
    report: reportOrError,
  });
};

module.exports = {
  createReportHandler,
  getReportHandler,
  approveReportHandler,
  rejectReportHandler,
  getAllReportsHandler,
};
