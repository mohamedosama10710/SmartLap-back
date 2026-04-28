const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestReference",
    required: true,
  },

  // النتيجة الفعلية
  result: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["H", "N", "L"],
  },
  // snapshot(مهم عشان التيست ممكن يتغير في المستقبل)
  testName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  unit: {
    type: String,
  },
  // هييجو من ال max و min في ال test reference
  referenceRange: {
    low: Number,
    high: Number,
  },
  // زي: "up to 5.0" أو "less than 200" 
  referenceText: {
    type: String,
  },
  critical: {
    type: Boolean,
    default: false,
  },

  trend: {
    direction: {
      type: String,
      enum: ["improving", "declining", "stable", "none"],
      default: "none",
    },
    note: String,
  },
});

const reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },

  tests: [testResultSchema], 

  requestDate: {
    type: Date,
    default: Date.now,
  },

  printedAt: Date,

  referredBy: String,

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);