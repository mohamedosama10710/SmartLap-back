import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

import Account from "../models/Account.js";
import Patient from "../models/Patient.js";
import Staff from "../models/Staff.js";
import Appointment from "../models/Appointment.js";
import Report from "../models/Report.js";
import TestReference from "../models/testReference.js";
import { data } from "../utils/testsArray.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to Atlas 🚀");

// تنظيف
await Promise.all([
  Account.deleteMany(),
  Patient.deleteMany(),
  Staff.deleteMany(),
  Appointment.deleteMany(),
  Report.deleteMany(),
  TestReference.deleteMany(),
]);

const password = await bcrypt.hash("1234", 10);

//
// ACCOUNTS
//
const accountsData = [
  {
    name: "Mohamed Osama",
    phone: "01011111111",
    email: "mohamedosama@gmail.com",
    password,
    role: "admin",
    isFirstLogin: false,
  },
  {
    name: "omar ayoub",
    phone: "0101111245",
    email: "omarayoub@gmail.com",
    password,
    role: "admin",
    isFirstLogin: false,
  },

  {
    name: "Sara Ali",
    phone: "01022222222",
    email: "sara123@gmail.com",
    password,
    role: "staff",
    isFirstLogin: false,
  },

  {
    name: "Omar Hassan",
    phone: "01033333333",
    email: "omar123@gmail.com",
    password,
    role: "staff",
    isFirstLogin: false,
  },
];

// 20 Patients
for (let i = 1; i <= 20; i++) {
  accountsData.push({
    name: `Patient ${i}`,
    phone: `01077${String(i).padStart(6, "0")}`,
    email: `patient${i}@gmail.com`,
    password,
    role: "patient",
    patientId: `P${String(i).padStart(3, "0")}`,
  });
}

const accounts = await Account.insertMany(accountsData);

//
// STAFF
//
await Staff.insertMany([
  {
    accountId: accounts[1]._id,
    nationalId: "29801011234567",
    department: "Lab",
    shift: "morning",
    salary: 8000,
    bonus: 500,
    payDay: 25,
  },
  {
    accountId: accounts[2]._id,
    nationalId: "29801011234568",
    department: "Reception",
    shift: "evening",
    salary: 7000,
    bonus: 300,
    payDay: 25,
  },
]);

//
// PATIENTS
//
const patientsData = [];

for (let i = 3; i < 23; i++) {
  patientsData.push({
    accountId: accounts[i]._id,
    gender: i % 2 === 0 ? "male" : "female",
    age: 20 + Math.floor(Math.random() * 40),
    chronicDiseases:
      i % 3 === 0 ? ["Diabetes"] : i % 4 === 0 ? ["Hypertension"] : [],
    isSmoker: i % 5 === 0,
    weight: 55 + Math.floor(Math.random() * 35),
    height: 155 + Math.floor(Math.random() * 30),
    medications:
      i % 3 === 0
        ? ["Metformin"]
        : i % 4 === 0
        ? ["Amlodipine"]
        : [],
  });
}

const patients = await Patient.insertMany(patientsData);

//
// TEST REFERENCES
//
const tests = await TestReference.insertMany(data);

//
// APPOINTMENTS (20)
//
const appointments = [];

for (let i = 0; i < 20; i++) {
  const day = String(10 + (i % 10)).padStart(2, '0');

  appointments.push({
    patient: accounts[i + 3]._id,
    appointmentDate: `2026-05-${day}`, // 👈 string format YYYY-MM-DD
    time: `${9 + (i % 6)}:00`,
    appointmentType: i % 4 === 0 ? "Home-Visit" : "Lab-Visit",
    address: i % 4 === 0 ? "Nasr City, Cairo" : undefined,
    status: ["cancelled", "completed"][i % 3],
  });
}
await Appointment.insertMany(appointments);

//
// REPORTS (20)
//
const reports = [];

for (let i = 0; i < 20; i++) {
  const test1 = tests[Math.floor(Math.random() * tests.length)];
  const test2 = tests[Math.floor(Math.random() * tests.length)];

  reports.push({
    createdBy: accounts[1]._id,
    patient: patients[i]._id,
    referredBy: `Dr. ${["Ahmed", "Mahmoud", "Hassan"][i % 3]}`,
    reportStatus: i % 3 === 0 ? "Pending" : "Completed",

    tests: [
      {
        test: test1._id,
        result: test1.min - 1,
        status: "L",
        testName: test1.testName,
        category: test1.category,
        unit: test1.unit,
        referenceRange: {
          low: test1.min,
          high: test1.max,
        },
        referenceText: test1.referenceText,
        patientAdvice: "Below normal range",
      },
      {
        test: test2._id,
        result: test2.max + 5,
        status: "H",
        testName: test2.testName,
        category: test2.category,
        unit: test2.unit,
        referenceRange: {
          low: test2.min,
          high: test2.max,
        },
        referenceText: test2.referenceText,
        patientAdvice: "Above normal range",
      },
    ],
  });
}

await Report.insertMany(reports);

console.log("Database seeded successfully ✅");
process.exit();