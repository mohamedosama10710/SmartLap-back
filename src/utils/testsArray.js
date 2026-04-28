export const data = [
  //  Hematology
  {
    testName: "Hemoglobin(HB)",
    category: "Hematology",
    applicableTo: "Male",
    unit: "g/dL",
    min: 13,
    max: 18,
    referenceText: "13 - 18 g/dL",
    criticalRange: { low: 7, high: 20 },
    referral: "Hematology/Internal Medicine"
  },
  {
    testName: "Hemoglobin(HB)",
    category: "Hematology",
    applicableTo: "Female",
    unit: "g/dL",
    min: 12,
    max: 16,
    referenceText: "12 - 16 g/dL",
    criticalRange: { low: 7, high: 18 },
    referral: "Hematology/Internal Medicine"
  },
  {
    testName: "Hemoglobin(HB)",
    category: "Hematology",
    applicableTo: "Children",
    unit: "g/dL",
    min: 11,
    max: 16,
    referenceText: "11 - 16 g/dL",
    criticalRange: { low: 7, high: 18 },
    referral: "Pediatrics"
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
    referral: "Internal Medicine"
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
    referral: "Hematology"
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
    referral: "Endocrinology"
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
    referral: "Endocrinology"
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
    referral: "Nephrology"
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
    referral: "Nephrology"
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
    referral: "Gastroenterology"
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
    referral: "Gastroenterology"
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
    referral: "Cardiology"
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
    referral: "Hematology"
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
    referral: "Internal Medicine"
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
    referral: "Emergency/Cardiology"
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
    referral: "Cardiology/Internal Medicine"
  }
];