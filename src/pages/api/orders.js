import dbConnect from "../../utils/dbConnect";
import Cart from "../../models/Cart";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  await dbConnect();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const userId = decoded.userId;
  const userRole = decoded.role;

  if (req.method === "GET") {
    try {
      let carts;

      if (userRole === "admin") {
        // Admin fetches all carts
        carts = await Cart.find();
      } else {
        // Customer fetches only their own cart
        carts = await Cart.find({ userId });
      }

      // Extract paid items from all carts
      const orders = carts.flatMap((cart) =>
        cart.items.filter((item) => item.paid)
      );

      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "PUT") {
    // Handle updating order shipment status
    const { orderId, status } = req.body;

    try {
      // Find the cart containing the item
      const cart = await Cart.findOne({ "items._id": orderId });
      if (!cart) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if the user is allowed to update the order
      if (userRole !== "admin" && cart.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Forbidden: You cannot update this order" });
      }

      // Update the shipment status of the specific item
      const item = cart.items.id(orderId);
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
      if (!item.paid) {
        return res.status(400).json({ message: "Order not paid" });
      }

      // Update the shipment status
      item.shipmentStatus = status;
      await cart.save();

      res.status(200).json({ message: "Order shipment status updated", item });
    } catch (error) {
      console.error("Error updating order shipment status:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
