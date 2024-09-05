import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the E-commerce Store</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
}
