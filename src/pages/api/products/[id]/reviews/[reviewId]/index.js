// pages/api/products/[id]/reviews.js
import connectDb from "../../../../../../utils/dbConnect";
import Product from "../../../../../../models/Product";

connectDb();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    const { reviewId, comment, rating, userId } = req.body;

    try {
      const product = await Product.findById(req.query.id);

      const reviewIndex = product.reviews.findIndex(
        (r) => r._id.toString() === reviewId
      );

      if (reviewIndex === -1) {
        return res.status(404).json({ message: "Review not found." });
      }

      // Check if the user is authorized to edit this review
      if (product.reviews[reviewIndex].user.id.toString() !== userId) {
        console.log("Unauthorized access. User ID does not match."); // Log unauthorized access
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this review." });
      }

      // Update the review
      product.reviews[reviewIndex].comment = comment;
      product.reviews[reviewIndex].rating = rating;

      await product.save();

      res.status(200).json({ message: "Review updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
