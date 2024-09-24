import dbConnect from "../../utils/dbConnect";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  const { searchTerm } = req.query;

  // Prepare a query object
  const query = {};
  if (searchTerm) {
    query.name = { $regex: searchTerm, $options: "i" }; // Case insensitive search
  }

  try {
    const products = await Product.find(query).limit(5); // Limit the number of suggestions
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
}
