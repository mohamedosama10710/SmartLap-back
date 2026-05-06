import mongoose from "mongoose";
const testReferenceSchema = new mongoose.Schema({
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
  referenceText: {
    type: String, 
      required: true,
  },

  criticalRange: {
    low: Number,
    high: Number,
  },
  adviceTemplates: {
  normal: String,
  low: String,
  high: String,
  critical: String,
},

  referral: String, // مثلا: "Cardiology", "Oncology"

}, { timestamps: true });

export default mongoose.model("TestReference", testReferenceSchema);
