import nodemailer from'nodemailer';
let sendEmail= async(options)=>{
try{
    const tranporter=nodemailer.createTransport
({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
    }
});

const emailoptions={
    from:'"Smart Lab " <smartlap458@gmail.com>',
    to:options.email,
    subject:options.subject,
    html:options.html
}
await tranporter.sendMail(emailoptions);
}
catch(error){
    throw error;
}
};
export{sendEmail};