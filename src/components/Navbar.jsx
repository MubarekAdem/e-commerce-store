import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css"; // Import your CSS module for styling

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/productlist">Product List</a>
        </li>
        {/* Add more navigation links as needed */}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
