// src/pages/api/cart/pay.js
import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/Cart";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === "POST") {
    const { productId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;

    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the item in the cart
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      // Mark the item as paid
      item.paid = true; // Add the paid property if not already present
      await cart.save();

      return res.status(200).json({ message: "Item marked as paid" });
    } catch (error) {
      console.error("Error updating payment status:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
