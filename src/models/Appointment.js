import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Appointment must belong to an account"],
    },
     confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    appointmentDate: {
      type: String,
      required: [true, "Please provide the appointment date"],
    },
    time: {
      type: String,
      required: [true, "Please provide the appointment time"],
    },
    appointmentType: {
      type: String,
      enum: ["Lab-Visit", "Home-Visit"],
      default: "Lab-Visit",
    },
    address: {
      type: String,
      required: function () {
        return this.appointmentType === "Home-Visit";
      },
    },

    status: {
      type: String,
      enum: [ "cancelled", "completed"],
      default: "completed",
    },
    notes: String,
   
  },
  { timestamps: true },
);
export default mongoose.model("Appointment", AppointmentSchema);
