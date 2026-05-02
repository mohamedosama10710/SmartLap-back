import {reportModel} from "../models/Report.js";
import {patientModel} from "../models/Patient.js";
import { sendEmail } from "../utils/sendEmail.js";
import Account from "../models/Account.js";


let getDangerousReports= async (req,res,next)=>{
try{
let DangerousReports=await reportModel.find({critical:true});
res.status(200).json({message:"success",results:DangerousReports.length,data:DangerousReports})
}
catch(error){
next(error)
}

};
let getPatientReport= async (req,res,next)=>{
    try{
const accountId=req.user._id;
const patient= await patientModel.findOne({accountId});
if(!patient){
 return res.status(404).json({message:" patient profile not found"});
}
let PatientReport= await reportModel.find({patient:patient._id}).populate({
                path: 'patient',
                populate: {
                    path: 'accountId', 
                   select: 'email name  phone role -password'
                }
            });
                  res.status(200).json({ 
            message: "done", 
            results: PatientReport.length, 
            data: PatientReport});
    }catch(error){
next(error)
    }


};
let editReport= async (req,res,next)=>{
  try {
    const { id } = req.params; 
    const { patient, referredBy, tests } = req.body;
    let processedTests = undefined;
    let allTestsCompleted = true;

    if (tests && tests.length > 0) {
      processedTests = [];
      for (const item of tests) {
        const reference = await mongoose.model("TestReference").findById(item.testId);

        if (!reference) {
          return res.status(404).json({ message: `Test reference not found for ID: ${item.testId}` });
        }

        let currentStatus = "Pending";
        let isCritical = false;
        let adviceMessage = "";

        if (item.result !== undefined && item.result !== null) {
          currentStatus = "N";
          adviceMessage = reference.adviceTemplates?.normal || "";

          if (item.result < reference.min) {
            currentStatus = "L";
            adviceMessage = reference.adviceTemplates?.low || "";
          } else if (item.result > reference.max) {
            currentStatus = "H";
            adviceMessage = reference.adviceTemplates?.high || "";
          }

          if (reference.criticalRange) {
            if ((reference.criticalRange.low && item.result <= reference.criticalRange.low) ||
                (reference.criticalRange.high && item.result >= reference.criticalRange.high)) {
              isCritical = true;
              adviceMessage = reference.adviceTemplates?.critical || adviceMessage;
            }
          }
        } else {
          allTestsCompleted = false;
        }

        processedTests.push({
          test: reference._id,
          result: item.result,
          status: currentStatus,
          critical: isCritical,
          patientAdvice: adviceMessage,
          testName: reference.testName,
          category: reference.category,
          unit: reference.unit,
          referenceRange: { low: reference.min, high: reference.max },
          referenceText: reference.referenceText,
        });
      }
    }

    const reportStatus = allTestsCompleted ? "Completed" : "Pending";

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        ...(patient && { patient }),           
        ...(referredBy && { referredBy }),     
        ...(processedTests && { tests: processedTests }), 
        reportStatus
      },
      { new: true, runValidators: true } 
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedReport,
    });
  } catch (error) {
    next(error);
  }
};

let deleteReport= async (req,res,next)=>{
try{
let {id}=req.params;
let deletedReport=await staffModel.findByIdAndDelete(id);
if(!deletedReport){
  return res.status(404).json({message:"not found"})
}
    res.status(200).json({ message: "Staff deleted successfully " });

}
catch(error){
next(error)
}

};

let sendPatientEmail= async (req,res,next)=>{
try{
let {email, subject, message, patientName}=req.body;
let user = await Account.findOne({ email });
if (!user) {
      return res.status(404).json({ 
        status: "Error", 
        message: "invalid Email" 
      });}

const htmlMessage = `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; direction: rtl;">
        <h2 style="color: #2c3e50;">أهلاً بك يا ${patientName}،</h2>
        <p style="font-size: 16px; color: #34495e;">
          ${message}
        </p>
        <hr>
        <p style="font-size: 12px; color: #7f8c8d;">
      </div>
    `;
    await sendEmail({
        
        
email: email,
      subject: subject ,
      message: htmlMessage    });
 res.status(200).json({ status: "Success", message: "Email sent to patient successfully" });
}
catch(error)
{
next(error);
}
};






export {getDangerousReports,getPatientReport,editReport,deleteReport,sendPatientEmail};
// import { testReference } from "../models/testReference";
import testReference  from "../models/testReference.js";
import Report  from "../models/Report.js";

//create report
export const createReport = async (req, res, next) => {
  try {
    const { patient, referredBy, tests } = req.body;

    const staffId = req.user._id;

    if (!tests || tests.length === 0) {
      const error = new Error("Please provide at least one test.");
      error.statusCode = 400;
      return next(error);
    }

    const processedTests = [];
    let allTestsCompleted = true;

    for (const item of tests) {
      const reference = await testReference.findById(item.testId);

      if (!reference) {
        const error = new Error(
          `Test reference not found for ID: ${item.testId}`,
        );
        error.statusCode = 404;
        return next(error);
      }

      let currentStatus = "Pending";
      let isCritical = false;
      let adviceMessage = "";

      if (item.result !== undefined && item.result !== null) {
        currentStatus = "N";
        adviceMessage = reference.adviceTemplates?.normal || "";

        if (item.result < reference.min) {
          currentStatus = "L";
          adviceMessage = reference.adviceTemplates?.low || "";
        } else if (item.result > reference.max) {
          currentStatus = "H";
          adviceMessage = reference.adviceTemplates?.high || "";
        }

        if (reference.criticalRange) {
          if (
            (reference.criticalRange.low &&
              item.result <= reference.criticalRange.low) ||
            (reference.criticalRange.high &&
              item.result >= reference.criticalRange.high)
          ) {
            isCritical = true;
            adviceMessage =
              reference.adviceTemplates?.critical || adviceMessage;
          }
        }
      } else {
        allTestsCompleted = false;
      }

      processedTests.push({
        test: reference._id,
        result: item.result,
        status: currentStatus,
        critical: isCritical,
        patientAdvice: adviceMessage,
        testName: reference.testName,
        category: reference.category,
        unit: reference.unit,
        referenceRange: {
          low: reference.min,
          high: reference.max,
        },
        referenceText: reference.referenceText,
      });
    }

    const reportStatus = allTestsCompleted ? "Completed" : "Pending";

    const newReport = await Report.create({
      patient,
      referredBy,
      tests: processedTests,
      reportStatus,
      createdBy: staffId,
    });

    res.status(201).json({
      status: "success",
      data: newReport,
    });
  } catch (error) {
    next(error);
  }
};

// get all reports
export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate({
        path: "patient",
        select: "name phone age gender",
      })
      .populate({
        path: "createdBy",
        select: "name role",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};
