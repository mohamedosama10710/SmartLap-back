const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

name:{type:String,required:true,minLength: [8,'User name must be at least 8 characters']},
 email:{
        type:String,unique: true, validate:{  validator: function(email){
                return /^[a-zA-Z]{3,10}[0-9]{0,3}(@)(gmail|yahoo)\.com$/.test(email) 
            },
            message:(prop)=> `${prop.value} is not valid` },} 
            ,password:{
    type:String,
    required:true, 
},
role:{
    type:String,
    enum:['patient','chemist','admin'],
    defult:'patient'
},
patientId:{
    type:Number,
    unique:true,
    sparse:true
},

age:{type:Number},
phone:{type:String,  required:true,},
gender:{ type:String, enum:['female','male']},
testName:{ type:String,},
createdAt: { type: Date, default: Date.now }
})
let userModel=mongoose.model('User',userSchema);
module.exports=userModel