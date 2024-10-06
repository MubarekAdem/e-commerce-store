// pages/api/products/[id]/reviews.js
import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product.reviews || []);
      } catch (error) {
        return res.status(500).json({ error: "Error fetching reviews" });
      }

    case "POST":
      try {
        const { comment, rating, user } = req.body;
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const review = {
          user: user.id, // Ensure this is the user ID
          comment,
          rating,
          createdAt: new Date(),
        };

        product.reviews.push(review);
        await product.save();

        return res.status(201).json({ review });
      } catch (error) {
        console.error("Error submitting review:", error);
        return res.status(500).json({ error: error.message });
      }

    case "PUT": // Handle review editing
      try {
        const { reviewId, comment, rating, userId } = req.body;

        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const review = product.reviews.id(reviewId);
        if (!review) {
          return res.status(404).json({ message: "Review not found" });
        }

        console.log("User ID from request:", userId); // Log the userId from the request
        console.log("Review user ID:", review.user.id.toString()); // Log the user ID from the review

        // Update the comparison to use review.user.id
        if (review.user.id.toString() !== userId) {
          console.error("Unauthorized access attempt");
          return res.status(403).json({ message: "Unauthorized" });
        }

        // Update the review with new data
        review.comment = comment || review.comment;
        review.rating = rating || review.rating;

        await product.save();

        return res
          .status(200)
          .json({ message: "Review updated successfully", review });
      } catch (error) {
        console.error("Error updating review:", error);
        return res.status(500).json({ error: error.message });
      }

    case "DELETE": // Delete review
      try {
        const { reviewId, userId } = req.body;

        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const reviewIndex = product.reviews.findIndex(
          (review) => review._id.toString() === reviewId
        );

        // Check if review exists and compare user IDs
        if (
          reviewIndex === -1 ||
          product.reviews[reviewIndex].user.id.toString() !== userId
        ) {
          return res.status(403).json({ message: "Unauthorized" });
        }

        // Remove the review using splice
        product.reviews.splice(reviewIndex, 1);
        await product.save();

        return res.status(200).json({ message: "Review deleted" });
      } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
