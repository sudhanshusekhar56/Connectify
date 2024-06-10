import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Account Verification",
    text: `Your verification code is ${code}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #007bff; text-align: center;">Welcome to Connectify!</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">
        Thank you for signing up with Connectify, your complete chat solution. To complete your registration, please use the following verification code:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 10px 20px; border: 1px solid #007bff; border-radius: 5px; background-color: #f7f7f7; color: #007bff; font-size: 24px; font-weight: bold;">
          ${code}
        </span>
      </div>
      <p style="font-size: 16px;">
        If you did not sign up for this account, please ignore this email.
      </p>
      <p style="font-size: 16px;">Best regards,<br/>The Connectify Team</p>
      <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #555;">
        © 2024 Connectify. All rights reserved.
      </footer>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return info;
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error("Error sending verification email");
  }
};

export default sendVerificationEmail;
