import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true
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
    default: [],
  },
});

export default mongoose.model("Patient", patientSchema);

