import mongoose from "mongoose";

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

<<<<<<< HEAD
export const patientModel = mongoose.model("Patient", patientSchema);
=======
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
>>>>>>> 560668ba10c1acc3f22586442bfe74a6c57ca1fd
