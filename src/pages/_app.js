import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext"; // Import CartProvider
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
