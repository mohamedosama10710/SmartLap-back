// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "apikey",
//     pass: process.env.SENDGRID_API_KEY,
//   },
//   connectionTimeout: 15000,
//   greetingTimeout: 15000,
//   socketTimeout: 15000,
// });

// export const sendEmail = async ({ email, subject, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject,
//       html,
//     });

//   } catch (error) {
//     console.error("EMAIL ERROR:", {
//       message: error.message,
//       code: error.code,
//       command: error.command,
//       response: error.response,
//     });
//     throw error;
//   }
// };



import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ email, subject, html,resetURL }) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.EMAIL_FROM,
       name: "SmartLab",
      subject,
       text: `Reset your password here: ${resetURL}`,
      html,
    });

    console.log("EMAIL SENT");
  } catch (error) {
    console.error(error.response?.body || error);
    throw error;
  }
};