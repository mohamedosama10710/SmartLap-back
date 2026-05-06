import mongoose from 'mongoose';
const labSettingsSchema=new mongoose.Schema({

workingHours:{
start:{
    type:String,
    default:"09:00"//9am
},
end:{
    type:String,
    default:"01:00"//1am
}
},slotDuration:{
    type:Number,
    default:30
},
offDays:{
    type: [String],
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      default: ["Friday"],
},updatedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"staff"
},
},
{ timestamps: true });
export default mongoose.model("LabSettings", labSettingsSchema);
