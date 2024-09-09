// src/pages/api/auth/register.js
import bcrypt from "bcryptjs";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    try {
      // Validate input
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ message: "Please provide email, password, and name." });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ email, password: hashedPassword, name });
      await user.save();

      // Respond with success
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
