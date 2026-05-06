import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🦖</span>
        <span className={styles.logoText}>ARK <span className={styles.accent}>Shop</span></span>
      </div>
      <p className={styles.subtitle}>Sklep z przedmiotami ARK Survival Ascended</p>
    </nav>
  );
}
