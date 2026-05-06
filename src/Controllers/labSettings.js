import lapsettingsModel from "../models/lapSettingModel.js";
import appointmentModel from "../models/Appointment.js"

export const  updateSchedule=async(req,res,next)=>{
try{
let {workingHours,slotDuration,offDays}=req.body;
let saveSchedule=await lapsettingsModel.findOneAndUpdate({},{workingHours,slotDuration,offDays},{new:true,runValidators: true,upsert: true});
res.status(200).json({message:"done",data:saveSchedule})
}
catch(error){
next(error)
}
};
export const  getSchedule=async(req,res,next)=>{
try{
    //1-get date from patient to search about
let {date}=req.query;
if(!date){
    return res .status(400).json({message:" provide a date "})
}
const today = new Date();
today.setHours(0, 0, 0, 0);

const selectedDate = new Date(date);
const maxDate = new Date();
maxDate.setDate(today.getDate() + 14);

if (selectedDate < today || selectedDate > maxDate) {
    return res.status(400).json({ 
        message: "Booking is only available within the next 14 days" 
    });
}
//2-get labseetings to see the seetings of start and and slot
let labSettings=await lapsettingsModel.findOne();
if(!labSettings){
    return res.status(404).json({message:"labSettings not found"})
}
//"9:15"to understand [9,15] make time all minutes
const [startHour, startMin] = labSettings.workingHours.start.split(':').map(Number);
const [endHour, endMin] = labSettings.workingHours.end.split(':').map(Number);
let startTotalMinutes = startHour * 60 + startMin;
let endTotalMinutes = endHour * 60 + endMin;
//if become next day increase time dont see 1 and make time decrease
if (endTotalMinutes <= startTotalMinutes) {
    endTotalMinutes += 24 * 60; 
}
//create the Schedule(availableSlots)
const allSlots = [];
//start as example 9 am so i=9 when i become 12 or 1 the end become less than start and loop stop so i do the condition 
//in for loop i increase in operation of houers %24 to apper for patient as noemal time  dont 25 or 00
for(let i= startTotalMinutes;i<endTotalMinutes;i+=labSettings.slotDuration){
    let h = Math.floor(i / 60) % 24; 
            let m = i % 60;
            //padStart for handle the output of time as 09:00 not 9:0
            allSlots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
}
//get bookedtimes

const bookedAppointments = await appointmentModel.find({ 
    appointmentDate: date, 
    status: { $ne: 'Cancelled' } 
}).select('time ');   


const bookedTimes = bookedAppointments.map(item => item.time);
        const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

        res.status(200).json({
            message: "Success",
            count: availableSlots.length,
            data: availableSlots
        })
}
catch(error){
    next(error)
}
};
