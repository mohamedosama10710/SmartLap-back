import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: "apikey", // ثابت زي ما هو
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER || '"Smart Lab" <your_verified_email@yourdomain.com>',
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(emailOptions);

    console.log("Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("Detailed Email Error:", error);
    throw new Error("Failed to send email");
  }
};

export { sendEmail };