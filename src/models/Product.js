import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  stock: { type: Number, default: 0 }, // Add stock tracking
  variants: [
    {
      size: String,
      color: String,
      stock: Number,
    },
  ], // Add variants for products
  categories: [String], // Optional categories
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // Reference to Supplier model
});
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
