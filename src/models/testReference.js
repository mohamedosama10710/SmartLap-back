import mongoose, { model } from "mongoose";

const shemaTest = mongoose.Schema({
    testName: {
        type: String,
        required: ["true", "testName is required"],
        // enum:["Hemoglobin(HB)","WBCs(TLC)","Platelets(PLT)","Random Sugar(RBS)","HbA1c","Creatinine","Urea","AST(SGOT)","ALT(SGPT)","Total Cholesterol","Ferritin","CRP","Troponin","INR"]
    },
    category: {
        type: String,
        required: [true, "category is required"],
        enum:["Male","Female","Children","Newborn","Adults","All"]
    },
    unit: {
        type: String,
        required: [true, "category is required"],
    },
    min: {
        type: Number,
        required: [true, "min is required"],
    },
    max: {
        type: Number,
        required: [true, "max is required"],

    },
    referral: {
        type: String,
        
    }
})

export  const testReference=mongoose.model("TestReference",shemaTest)