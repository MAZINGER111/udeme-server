const { Report } = require("../models/report");

const createReport = async ({
  projectName,
  status,
  state,
  address,
  lga,
  desc,
  images,
  submittedBy,
}) => {
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
    return;

  const report = new Report();
  if (images) {
    report.images = images;
  }
  report.projectName = projectName;
  report.status = status;
  report.state = state;
  report.address = address;
  report.lga = lga;
  report.submittedBy = submittedBy;

  const reportInstance = await report.save();

  if (!reportInstance) return "Error creating report";

  return reportInstance;
};

const getReportById = async ({ id }) => {
  if (!id || id.length !== 24) return;

  const report = await Report.findById(id).exec();
  if (!report) return "report not found";

  return report;
};

const approveReport = async ({ id }) => {
  if (!id || id.length !== 24) return;
  const updatedReport = await Project.findByIdAndUpdate(
    id,
    { status: "approved" },
    {
      new: true,
    }
  );

  //   TODO: email theme to research project
  return updatedReport;
};
const rejectReport = async ({ id }) => {
  if (!id || id.length !== 24) return;
  const updatedReport = await Project.findByIdAndUpdate(
    id,
    { status: "rejected" },
    {
      new: true,
    }
  );

  //   TODO: email submittedBy about the project
  return updatedReport;
};

const getAllReports = async () => {
  const allReports = await Report.find({});

  return allReports;
};
module.exports = {
  createReport,
  getReportById,
  approveReport,
  rejectReport,
  getAllReports,
};
