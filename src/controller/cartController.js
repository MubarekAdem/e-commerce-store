// controllers/cartController.js
const Cart = require("../models/Cart"); // Import your Cart model
const User = require("../models/User"); // Import your User model if needed for role checking

// Middleware to check if the user is an admin
const isAdmin = (user) => user.role === "admin"; // Adjust according to your role setup

// Fetch all carts for admins or only the user's cart for regular users
exports.getCarts = async (req, res) => {
  try {
    const user = req.user; // Assuming you've set up authentication middleware that attaches user to req

    let carts;
    if (isAdmin(user)) {
      // Fetch all carts if the user is an admin
      carts = await Cart.find({});
    } else {
      // Fetch only the user's cart
      carts = await Cart.find({ userId: user._id });
    }

    res.status(200).json({ carts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching carts", error: error.message });
  }
};

// Update shipment status, allowing admin to update any cart
exports.updateShipmentStatus = async (req, res) => {
  try {
    const { itemId, status } = req.body;
    const user = req.user; // Assuming the user is attached to the request from authentication middleware

    // Allow only the admin to update any cart or check ownership for regular users
    const query = isAdmin(user)
      ? { "items._id": itemId }
      : { "items._id": itemId, userId: user._id };

    const cartItem = await Cart.findOneAndUpdate(
      query,
      { $set: { "items.$.shipmentStatus": status } },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Shipment status updated successfully", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating shipment status",
        error: error.message,
      });
  }
};
