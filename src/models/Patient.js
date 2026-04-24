const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  gender: {
    type: String,
    enum: ["female", "male"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  chronicDiseases: {
    type: [String],
    required: true,
    default: [],
  },
  previousSurgeries: {
    type: [String],
    default: [],
  },
  isSmoker: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  medications: {
    type: [String],
    enum: ["antibiotic", "blood_thinner", "other"],
    default: [],
  },
});

module.exports = mongoose.model("Patient", patientSchema);