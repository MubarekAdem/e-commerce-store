import dbConnect from "../../utils/dbConnect"; // Ensure correct import
import Cart from "../../models/Cart"; // Ensure Cart model is imported

const handler = async (req, res) => {
  await dbConnect();

  // Assuming you have some mechanism to get the userId, e.g., from JWT token
  const userId = req.user?.id; // Get userId from the authenticated user context

  if (req.method === "POST") {
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
      await cart.save();
      return res
        .status(201)
        .json({ message: "Cart created", product: { productId } });
    }

    // Check if product exists in cart and update
    const existingProduct = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1; // Update quantity
    } else {
      cart.items.push({ productId, quantity: 1 }); // Add new product
    }

    await cart.save();
    return res
      .status(200)
      .json({ message: "Product added to cart", product: { productId } });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
