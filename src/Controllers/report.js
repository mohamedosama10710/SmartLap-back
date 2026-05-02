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