import dbConnect from "../../utils/dbConnect";
import Cart from "../../models/Cart";
import Product from "../../models/Product"; // Import your Product model
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  await dbConnect();

  // Check the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract Bearer token
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Verify the token using the same secret used to sign it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the decoded token
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (req.method === "GET") {
      // Fetch the user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json(cart);
    }

    if (req.method === "POST") {
      const { productId, paid = true } = req.body; // Set paid to true by default

      // Fetch product details from the Product model
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Find or create the user's cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({
          userId,
          items: [
            {
              productId,
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: 1,
              paid, // Use the paid status from the request body
            },
          ],
        });
        await cart.save();
        return res.status(201).json({ message: "Cart created", product });
      }

      // Check if the product already exists in the cart
      const existingProduct = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
        existingProduct.paid = true; // Ensure the existing product is marked as paid
      } else {
        // Add new product with full details
        cart.items.push({
          productId,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
          paid, // Set paid to true for new items
        });
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Product added to cart", product });
    }

    if (req.method === "DELETE") {
      const { productId } = req.body; // Get productId from request body

      // Find the user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the product in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      // Check if the item quantity is greater than 1
      if (cart.items[itemIndex].quantity > 1) {
        // Decrease the quantity by 1
        cart.items[itemIndex].quantity -= 1;
      } else {
        // Remove the item completely if the quantity is 1
        cart.items.splice(itemIndex, 1);
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Product removed from cart", items: cart.items });
    }

    if (req.method === "PUT") {
      const { productId } = req.body; // Get productId from request body

      // Find the user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the product in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      // Update the paid status of the product
      cart.items[itemIndex].paid = true; // Mark as paid

      await cart.save(); // Save the updated cart to the database
      return res
        .status(200)
        .json({ message: "Product marked as paid", items: cart.items });
    } else {
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error verifying token or cart operation:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default handler;
