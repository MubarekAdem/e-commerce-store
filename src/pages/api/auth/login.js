import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import connect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await connect();

  try {
    switch (method) {
      case "POST":
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create a JWT token including role and isInstructor
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role,
            isInstructor: user.isInstructor,
          },
          "Mubarek@12",
          { expiresIn: "10y" }
        );

        // Determine the redirect URL based on the user's role
        const redirectUrl = user.role === "admin" ? "/admin" : "/dashboard";

        return res.status(200).json({ token, redirectUrl });

      case "GET":
        const authToken = req.headers.authorization?.split(" ")[1]; // Extract token from header
        if (!authToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(authToken, "Mubarek@12");
        const userId = decodedToken.userId;

        const userData = await User.findById(userId);
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: userData });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
