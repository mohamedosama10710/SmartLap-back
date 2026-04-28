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
  referenceText: String,

  criticalRange: {
    low: Number,
    high: Number,
  },

  referral: String, // مثلا: "Cardiology", "Oncology"

}, { timestamps: true });