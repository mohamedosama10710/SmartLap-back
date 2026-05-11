import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);

let sendEmail = async (options) => {
  try {
    const tranporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
     
    });

    const emailoptions = {
      from: '"Smart Lab " <smartlap458@gmail.com>',
      to: options.email,
      subject: options.subject,
      html: options.html,
    };
    await tranporter.sendMail(emailoptions);
  } catch (error) {
    console.error("Detailed Email Error:", error); // ضيف السطر ده ضروري
    throw error;
  }
};
export { sendEmail };
