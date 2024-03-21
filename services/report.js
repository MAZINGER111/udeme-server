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
  report.desc = desc;
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

const approveReport = async ({ id, newData }) => {
  if (!id || id.length !== 24) return;

  // let updates = { status: "approved" };

  // if (newData) {
  //   updates = { ...updates, ...newData };
  // }
  const updatedReport = await Report.findByIdAndUpdate(id, updates, {
    new: true,
  });

  //   TODO: email theme to research project
  return updatedReport;
};

const rejectReport = async ({ id }) => {
  if (!id || id.length !== 24) return;
  const updatedReport = await Report.findByIdAndUpdate(
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

const deleteReport = async ({ id }) => {
  if (!id) return "Report not found";

  const deletedData = await Report.deleteOne({ _id: id });

  return deletedData.deletedCount;
};
module.exports = {
  createReport,
  getReportById,
  approveReport,
  rejectReport,
  getAllReports,
  deleteReport,
};
