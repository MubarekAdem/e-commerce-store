import jwt from "jsonwebtoken";
import User from "../../../models/User";
import connect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  await connect();

  try {
    const authToken = req.headers.authorization?.split(" ")[1]; // Extract token from header
    if (!authToken) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // Log the token for debugging
    console.log("Auth Token:", authToken);

    // Verify token using the secret from environment variables
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // Log decoded token for debugging
    console.log("Decoded Token:", decodedToken);

    const userId = decodedToken.userId;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
