import mongoose from "mongoose";
const testReferenceSchema = new mongoose.Schema(
  {
    testName: { type: String, required: true, trim: true },

    category: { type: String, required: true },

    applicableTo: {
      type: String,
      enum: ["Male", "Female", "Children", "Newborn", "Adults", "All"],
      default: "All",
    },

    unit: { type: String, required: true },

    min: { type: Number, required: true },
    max: { type: Number, required: true },

    // زي: "from 2.0 to 5.0" أو "less than 200"
    referenceText: String,

    criticalRange: {
      low: Number,
      high: Number,
    },

    referral: String, // مثلا: "Cardiology", "Oncology"
    
    adviceTemplates: {
      low: { type: String, default: "" }, // Message when result < min
      normal: { type: String, default: "" }, // Message when result is within range
      high: { type: String, default: "" }, // Message when result > max
      critical: { type: String, default: "" }, // Message for emergency values
    },
  },
  { timestamps: true },
);

const testReference = mongoose.model("TestReference", testReferenceSchema);
export default testReference;