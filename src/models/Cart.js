const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [CartItemSchema],
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
