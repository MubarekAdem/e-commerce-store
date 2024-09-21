import Product from "../../../models/Product";
import dbConnect from "../../../utils/dbConnect";

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
      // Handle PUT request for updating the product
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
      // Handle DELETE request if needed
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
