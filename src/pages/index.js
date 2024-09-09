import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";

import AddProduct from "../components/AddProduct";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the E-commerce Store</h1>
      <AddProduct />
      <ProductList />
      <Link href="/register">Register</Link> | <Link href="/login">Login</Link>
    </div>
  );
}
