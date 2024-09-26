import dbConnect from "../../utils/dbConnect";
import Cart from "../../models/Cart";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  await dbConnect();

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  if (req.method === "GET") {
    try {
      // Fetch only carts with paid items
      const carts = await Cart.find({ "items.paid": true });

      // Extract paid items from all carts
      const orders = carts.flatMap((cart) =>
        cart.items.filter((item) => item.paid)
      );

      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
