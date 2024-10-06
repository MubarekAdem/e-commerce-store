// models/Cart.js
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  shipmentStatus: { type: String, default: "Pending" }, // New field for shipment status
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [CartItemSchema],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart; // Use default export
