// src/pages/api/products/[id].js

import Product from "../../../../models/Product";
import dbConnect from "../../../../utils/dbConnect";
import { protect } from "../../../../middleware/authMiddleware";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.status(200).json(product);
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error fetching product" });
      }
      break;

    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.status(200).json(product);
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error updating product" });
      }
      break;

    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res
          .status(200)
          .json({ success: true, message: "Product deleted successfully" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error deleting product" });
      }
      break;

    case "POST": // Handle review submission
      await protect(req, res); // Protect the route with JWT authentication

      if (!req.user || !req.user._id || !req.user.email) {
        return res
          .status(401)
          .json({ success: false, message: "User not authenticated" });
      }

      try {
        const { comment, rating } = req.body;

        // Validate rating and comment
        if (!comment || typeof comment !== "string" || comment.trim() === "") {
          return res
            .status(400)
            .json({ success: false, message: "Comment is required" });
        }
        if (!rating || rating < 1 || rating > 5) {
          return res.status(400).json({
            success: false,
            message: "Rating must be between 1 and 5",
          });
        }

        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }

        // Check if the user already reviewed the product
        const alreadyReviewed = product.reviews.some(
          (r) => r.user.id.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
          return res.status(400).json({
            success: false,
            message: "You have already reviewed this product",
          });
        }

        // Create a new review object
        const review = {
          user: {
            id: req.user._id, // User's ID
            email: req.user.email, // User's email
          },
          comment,
          rating,
          createdAt: new Date(),
        };

        // Add the review to the product's reviews array
        product.reviews.push(review);
        await product.save();

        res.status(201).json({ success: true, review });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Error submitting review" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
