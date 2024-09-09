import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? <div>Welcome to the Dashboard, {user.name}!</div> : null;
}
