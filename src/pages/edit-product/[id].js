import dbConnect from "../../utils/dbConnect";
import Product from "../../models/Product";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  console.log("Received request:", req.method, "for ID:", id);

  switch (req.method) {
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
        console.error("Error fetching product:", error);
        res
          .status(400)
          .json({ success: false, message: "Error fetching product" });
      }
      break;

    case "PUT":
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedProduct) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
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
        return res
          .status(200)
          .json({ success: true, message: "Product deleted" });
      } catch (error) {
        console.error("Error deleting product:", error);
        return res
          .status(400)
          .json({ success: false, message: "Error deleting product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
