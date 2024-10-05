import dbConnect from "../../utils/dbConnect";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
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

    // Check if the user is admin (modify this according to your user roles)
    const isAdmin = decoded.role === "admin"; // Assume your token contains a role

    // Log the decoded values for debugging
    console.log("Decoded user ID:", userId);
    console.log("Is Admin:", isAdmin);

    if (req.method === "GET") {
      // Admin can fetch all carts or user can fetch their own
      const cart = isAdmin
        ? await Cart.find({}) // Fetch all carts for admin
        : await Cart.findOne({ userId }); // Regular user fetches their own cart

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.status(200).json(cart);
    }

    if (req.method === "POST") {
      const { productId, paid = false } = req.body;

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
              paid,
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
        // existingProduct.paid = true; // Ensure the existing product is marked as paid
      } else {
        // Add new product with full details
        cart.items.push({
          productId,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
          paid,
        });
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Product added to cart", product });
    }

    if (req.method === "DELETE") {
      const { productId } = req.body;

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
      const { productId, paid, userIdToUpdate } = req.body; // Accept userIdToUpdate for admins

      // Log the request body for debugging
      console.log("Request body for PUT:", req.body);

      // Admin can update any user's cart, regular users can only update their own
      const cart = isAdmin
        ? await Cart.findOne({ userId: userIdToUpdate }) // Admin specifies which user's cart to update
        : await Cart.findOne({ userId }); // Regular user accesses their own cart

      if (!cart) {
        console.log(
          `Cart not found for user ID: ${isAdmin ? userIdToUpdate : userId}`
        );
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the item in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      // Update the paid status of the product
      cart.items[itemIndex].paid = paid; // Update the paid status
      // You can also update shipment status or any other fields as needed
      cart.items[itemIndex].shipmentStatus = "Shipped"; // Example of updating shipment status

      await cart.save(); // Save the updated cart to the database
      return res
        .status(200)
        .json({ message: "Product status updated", items: cart.items });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error verifying token or cart operation:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default handler;
