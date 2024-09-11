import nodemailer from "nodemailer";
import User from "../../../models/User";
import connect from "../../../utils/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a six-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Save the code and expiration to the user's record
      user.resetCode = code;
      user.resetCodeExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send email with reset code
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Or use another email service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Code",
        html: `<p>You requested a password reset</p>
               <p>Your reset code is: <strong>${code}</strong></p>`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Reset code sent to your email" });
    } catch (error) {
      console.error("Error in forgot-password handler:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
