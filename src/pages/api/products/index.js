import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const products = await Product.find();
      res.status(200).json(products);
    } else if (req.method === "POST") {
      const { name, description, price, imageUrl, stock, category, variants } =
        req.body;

      const product = new Product({
        name,
        description,
        price,
        imageUrl,
        stock,
        category,
        variants,
      });

      await product.save();
      res.status(201).json(product);
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await Product.findByIdAndDelete(id);
      res.status(204).json({ message: "Product deleted successfully." });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
