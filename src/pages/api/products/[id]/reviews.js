// pages/api/products/[id]/reviews.js
import dbConnect from "../../../../utils/dbConnect"; // Adjust this path according to your project structure
import Product from "../../../../models/Product"; // Adjust this path according to your project structure

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database connection

  const { method } = req;

  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        return res.status(200).json(product.reviews || []);
      } catch (error) {
        return res.status(500).json({ error: "Error fetching reviews" });
      }

    case "POST":
      try {
        const { comment, rating, user } = req.body; // Destructure user from the request body

        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const review = {
          user, // This should now include both ID and email
          comment,
          rating,
          createdAt: new Date(),
        };

        product.reviews.push(review);
        await product.save();

        return res.status(201).json({ review });
      } catch (error) {
        console.error("Error submitting review:", error); // Log the error for debugging
        return res.status(500).json({ error: error.message }); // Send back the error message
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
