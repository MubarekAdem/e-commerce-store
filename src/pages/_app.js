import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext"; // Import CartProvider
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CartProvider>
  );
}

export default MyApp;
