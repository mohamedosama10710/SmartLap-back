import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]{14}$/, "National ID must be exactly 14 digits"],
  },
  shift: {
    type: String,
    enum: ["morning", "evening"],
    required: true,
  },
  daysOff: {
    type: [String],
    enum: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    default: ["Friday"],
  },
  salary: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  payDay: {
    type: Number,
    min: 1,
    max: 31,
    required: true,
  },
  hiredAt: {
    type: Date,
    default: Date.now,
  },
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
