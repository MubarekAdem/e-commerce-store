// pages/reviews.js
import React from "react";
import Cart from "../components/userComponents/Cart"; // Ensure the correct import path
import Navbar from "@/components/commonComponents/Navbar";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <Cart />
    </div>
  );
};

export default CartPage;
