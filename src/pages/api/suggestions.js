import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  const { term } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: term, $options: "i" },
    }).limit(5); // Limit suggestions

    const suggestions = products.map((product) => product.name);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions", error });
  }
}
