import styles from "./Navbar.module.css";

const ClawIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 20L10 4" />
    <path d="M9.5 20L14.5 4" />
    <path d="M14 20L19 4" />
  </svg>
);

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <img
          src={`${import.meta.env.BASE_URL}images/logo_bez_bg.png`}
          alt="Nocne Sowy — ARK Shop"
          className={styles.logoImg}
        />
      </div>
    </nav>
  );
}
