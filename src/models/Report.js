const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  testName: {
    type: String,
    required: true,
  },
  testCategory: {
    type: String,
  },
  status: {
    type: String,
    enum: ["H", "N", "L", ""],
    default: "",
  },
  date: { type: Date, default: Date.now },
  referenceRange: { type: String },
  trend: {
    direction: {
      type: String,
      enum: ["improving", "declining", "stable", "none"],
    },
    note: String,
  },
});
let reportModel = mongoose.model("Report", reportSchema);
module.exports = reportModel;
