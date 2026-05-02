import mongoose from "mongoose";

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
    enum: ["H", "N", "L", "Pending"],
    default: "Pending",
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
  patientAdvice: {
    type: String,
    default: "",
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

const reportSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
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

    reportStatus: {
      type: String,
      enum: ["Pending", "Completed", "Printed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);

