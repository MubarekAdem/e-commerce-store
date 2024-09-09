import Link from "next/link";
import styles from "./Navbar.module.css"; // Add your CSS module for styling

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/register">Register</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
