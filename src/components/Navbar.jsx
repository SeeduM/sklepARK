import styles from './Navbar.module.css';

const ClawIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 20L10 4"/>
    <path d="M9.5 20L14.5 4"/>
    <path d="M14 20L19 4"/>
  </svg>
);

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}><ClawIcon /></span>
        <span className={styles.logoText}>ARK <span className={styles.accent}>Shop</span></span>
      </div>
      <p className={styles.subtitle}>Sklep z przedmiotami ARK Survival Ascended</p>
    </nav>
  );
}
