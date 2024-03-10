const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    status: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    lga: { type: String, required: true },
    desc: { type: Schema.Types.Mixed, required: true },
    images: { type: [String] },
    submittedBy: {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = { Report };
