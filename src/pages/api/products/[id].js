import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  if (method === "DELETE") {
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
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
