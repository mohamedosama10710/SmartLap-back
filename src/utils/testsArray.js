export const data = [
  //  Hematology
 {
  testName: "Hemoglobin(male)",
  category: "Hematology",
  applicableTo: "Male",
  unit: "g/dL",
  min: 13,
  max: 18,
  referenceText: "13 - 18 g/dL",
  criticalRange: { low: 7, high: 20 },
  referral: "Hematology/Internal Medicine",
  adviceTemplates: {
    normal: "Hemoglobin level is within the normal range.",
    low: "Hemoglobin is below normal. This may suggest anemia and should be clinically evaluated.",
    high: "Hemoglobin is above normal. Further assessment may be required.",
    critical: "Critical hemoglobin level detected. Immediate medical evaluation is strongly recommended."
  }
},
  {
    testName: "Hemoglobin(female)",
    category: "Hematology",
    applicableTo: "Female",
    unit: "g/dL",
    min: 12,
    max: 16,
    referenceText: "12 - 16 g/dL",
    criticalRange: { low: 7, high: 18 },
    referral: "Hematology/Internal Medicine",
    adviceTemplates: {
  normal: "Hemoglobin level is within the normal range.",
  low: "Low hemoglobin may indicate anemia or iron deficiency. Clinical follow-up is advised.",
  high: "Elevated hemoglobin detected. Further medical assessment is recommended.",
  critical: "Critical hemoglobin value detected. Urgent medical attention is required."
}
  },
  {
    testName: "Hemoglobin(Children)",
    category: "Hematology",
    applicableTo: "Children",
    unit: "g/dL",
    min: 11,
    max: 16,
    referenceText: "11 - 16 g/dL",
    criticalRange: { low: 7, high: 18 },
    referral: "Pediatrics",
    adviceTemplates: {
  normal: "Hemoglobin level is appropriate for age.",
  low: "Low hemoglobin may indicate pediatric anemia. Pediatric consultation is recommended.",
  high: "Higher than expected hemoglobin level detected.",
  critical: "Critical pediatric hemoglobin level detected. Immediate pediatric evaluation is advised."
}
  },

  // 🧪 WBC
  {
    testName: "WBCs(TLC)",
    category: "Hematology",
    applicableTo: "Adults",
    unit: "10^3/µL",
    min: 4,
    max: 11,
    referenceText: "4 - 11 x10^3/µL",
    criticalRange: { low: 2, high: 25 },
    referral: "Internal Medicine",
    adviceTemplates: {
  normal: "White blood cell count is within the normal range.",
  low: "Low WBC count may indicate reduced immune response.",
  high: "Elevated WBC count may suggest infection or inflammation.",
  critical: "Critical white blood cell count detected. Immediate clinical review is required."
}
  },

  // 🧬 Platelets
  {
    testName: "Platelets(PLT)",
    category: "Hematology",
    applicableTo: "All",
    unit: "10^3/µL",
    min: 150,
    max: 450,
    referenceText: "150 - 450 x10^3/µL",
    criticalRange: { low: 50, high: 1000 },
    referral: "Hematology",
    adviceTemplates: {
  normal: "Platelet count is within normal limits.",
  low: "Low platelet count may increase bleeding risk.",
  high: "High platelet count detected. Further evaluation may be necessary.",
  critical: "Critical platelet count detected. Immediate medical assessment is recommended."
}
  },

  // 🍬 Sugar
  {
    testName: "Random Sugar(RBS)",
    category: "Clinical Chemistry",
    applicableTo: "All",
    unit: "mg/dL",
    min: 70,
    max: 140,
    referenceText: "70 - 140 mg/dL",
    criticalRange: { low: 50, high: 400 },
    referral: "Endocrinology",
    adviceTemplates: {
  normal: "Random blood sugar is within the acceptable range.",
  low: "Low blood sugar detected. Monitor symptoms and seek evaluation if needed.",
  high: "Elevated blood sugar detected. Follow-up testing may be required.",
  critical: "Critical blood sugar level detected. Immediate medical attention is recommended."
}
  },

  {
    testName: "HbA1c",
    category: "Clinical Chemistry",
    applicableTo: "All",
    unit: "%",
    min: 4.2,
    max: 6.2,
    referenceText: "4.2 - 6.2 %",
    criticalRange: { low: 3.5, high: 10 },
    referral: "Endocrinology",
    adviceTemplates: {
  normal: "HbA1c is within the normal range.",
  low: "Lower than expected HbA1c detected.",
  high: "Elevated HbA1c may indicate poor blood sugar control.",
  critical: "Critically elevated HbA1c detected. Urgent diabetic management review is advised."
}
  },

  // 🧠 Kidney
  {
    testName: "Creatinine",
    category: "Clinical Chemistry",
    applicableTo: "Male",
    unit: "mg/dL",
    min: 0.4,
    max: 1.4,
    referenceText: "0.4 - 1.4 mg/dL",
    criticalRange: { low: 0.2, high: 5 },
    referral: "Nephrology",
    adviceTemplates: {
  normal: "Creatinine level is within normal kidney function range.",
  low: "Lower creatinine detected; clinical correlation may be needed.",
  high: "Elevated creatinine may indicate reduced kidney function.",
  critical: "Critical creatinine level detected. Immediate nephrology evaluation is recommended."
}
  },

  {
    testName: "Urea",
    category: "Clinical Chemistry",
    applicableTo: "All",
    unit: "mg/dL",
    min: 15,
    max: 45,
    referenceText: "15 - 45 mg/dL",
    criticalRange: { low: 5, high: 150 },
    referral: "Nephrology",
    adviceTemplates: {
  normal: "Creatinine level is within normal kidney function range.",
  low: "Lower creatinine detected; clinical correlation may be needed.",
  high: "Elevated creatinine may indicate reduced kidney function.",
  critical: "Critical creatinine level detected. Immediate nephrology evaluation is recommended."
}
  },

  // 🧬 Liver
  {
    testName: "AST(SGOT)",
    category: "Liver Function",
    applicableTo: "All",
    unit: "U/L",
    min: 0,
    max: 38,
    referenceText: "Up to 38 U/L",
    criticalRange: { high: 200 },
    referral: "Gastroenterology",
    adviceTemplates: {
  normal: "AST level is within normal range.",
  low: "No clinical concern for low AST.",
  high: "Elevated AST may indicate liver or muscle injury.",
  critical: "Critical AST elevation detected. Immediate clinical evaluation is recommended."
}
  },

  {
    testName: "ALT(SGPT)",
    category: "Liver Function",
    applicableTo: "All",
    unit: "U/L",
    min: 0,
    max: 40,
    referenceText: "Up to 40 U/L",
    criticalRange: { high: 200 },
    referral: "Gastroenterology",
    adviceTemplates: {
  normal: "ALT level is within normal range.",
  low: "No clinical concern for low ALT.",
  high: "Elevated ALT may suggest liver cell injury.",
  critical: "Critical ALT elevation detected. Urgent liver assessment is recommended."
}
  },

  // ❤️ Lipid
  {
    testName: "Total Cholesterol",
    category: "Lipid Profile",
    applicableTo: "All",
    unit: "mg/dL",
    min: 50,
    max: 200,
    referenceText: "Less than 200 mg/dL",
    criticalRange: { high: 300 },
    referral: "Cardiology",
    adviceTemplates: {
  normal: "Cholesterol level is within the recommended range.",
  low: "Lower cholesterol level detected.",
  high: "Elevated cholesterol may increase cardiovascular risk.",
  critical: "Critical cholesterol level detected. Immediate cardiovascular follow-up is advised."
}
  },

  // 🩸 Ferritin
  {
    testName: "Ferritin",
    category: "Hematology",
    applicableTo: "Male",
    unit: "ng/mL",
    min: 30,
    max: 300,
    referenceText: "30 - 300 ng/mL",
    criticalRange: { high: 1000 },
    referral: "Hematology",
    adviceTemplates: {
  normal: "Ferritin level is within normal iron storage range.",
  low: "Low ferritin may indicate iron deficiency.",
  high: "Elevated ferritin may suggest inflammation or iron overload.",
  critical: "Critical ferritin level detected. Immediate hematology review is recommended."
}
  },

  // 🔥 CRP
  {
    testName: "CRP",
    category: "Inflammation",
    applicableTo: "All",
    unit: "mg/L",
    min: 0,
    max: 6,
    referenceText: "Up to 6 mg/L",
    criticalRange: { high: 100 },
    referral: "Internal Medicine",
    adviceTemplates: {
  normal: "CRP level is within normal range.",
  low: "CRP is low and not clinically concerning.",
  high: "Elevated CRP may indicate inflammation or infection.",
  critical: "Critical CRP elevation detected. Immediate clinical assessment is recommended."
}
  },

  // ❤️ Troponin
  {
    testName: "Troponin",
    category: "Cardiac Markers",
    applicableTo: "All",
    unit: "ng/mL",
    min: 0,
    max: 0.04,
    referenceText: "Up to 0.04 ng/mL",
    criticalRange: { high: 0.5 },
    referral: "Emergency/Cardiology",
    adviceTemplates: {
  normal: "Troponin level is within normal limits.",
  low: "Troponin is within acceptable range.",
  high: "Elevated troponin detected. Cardiac evaluation is recommended.",
  critical: "Critical troponin elevation detected. Immediate emergency cardiac assessment is required."
}
  },

  // 🧬 INR
  {
    testName: "INR",
    category: "Coagulation",
    applicableTo: "All",
    unit: "Ratio",
    min: 1.0,
    max: 2.0,
    referenceText: "1.0 - 2.0",
    criticalRange: { high: 5 },
    referral: "Cardiology/Internal Medicine",
    adviceTemplates: {
  normal: "INR is within the therapeutic range.",
  low: "Low INR may indicate increased clotting tendency.",
  high: "Elevated INR may increase bleeding risk.",
  critical: "Critical INR level detected. Immediate medical evaluation is required."
}
  }
];