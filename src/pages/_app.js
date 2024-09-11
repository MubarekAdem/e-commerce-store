import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setCurrentUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <AuthProvider value={{ currentUser }}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
