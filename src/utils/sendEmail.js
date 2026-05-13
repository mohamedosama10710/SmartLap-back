import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log('SENDGRID LOADED');
console.log(process.env.SENDGRID_API_KEY?.slice(0, 10));
console.log(process.env.EMAIL_FROM);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ email, subject, html }) => {
  try {
    console.log('Sending with SendGrid to:', email);

    const response = await sgMail.send({
      to: email,
      from: process.env.EMAIL_FROM,
      subject,
      html
    });

    console.log('SUCCESS:', response);
  } catch (error) {
    console.log('SENDGRID ERROR:', error.response?.body || error);
    throw error;
  }
};