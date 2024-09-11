import User from "../../../models/User";
import connect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    const { code, newPassword, token } = req.body;

    try {
      // Find user with reset code
      const user = await User.findOne({
        resetCode: code,
        resetCodeExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired reset code" });
      }

      // Hash the new password and update the user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetCode = undefined; // Clear reset code
      user.resetCodeExpires = undefined; // Clear expiration
      await user.save();

      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
