const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number,
  variants: [
    {
      size: String,
      color: String,
      stock: Number,
    },
  ],
  categories: [String],
});

// Avoid recompiling the model
if (!mongoose.models.Product) {
  mongoose.model("Product", ProductSchema);
}

module.exports = mongoose.models.Product || mongoose.model("Product");
