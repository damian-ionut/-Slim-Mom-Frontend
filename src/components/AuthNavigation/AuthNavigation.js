import styles from "./AuthNavigation.module.scss";
import { NavLink } from "react-router-dom";

function AuthNavigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Registration
      </NavLink>
    </nav>
  );
}

export default AuthNavigation;