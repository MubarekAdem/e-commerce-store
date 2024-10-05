// src/models/Product.js

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String, required: true },
  },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true },
  variants: [{ size: String, color: String, stock: Number }],
  categories: [String],
  reviews: [ReviewSchema], // Ensure this is defined here
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
