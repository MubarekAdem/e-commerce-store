import "../styles/globals.css"; // Your global styles
import { AuthProvider } from "../contexts/AuthContext"; // Ensure your AuthProvider is imported

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
