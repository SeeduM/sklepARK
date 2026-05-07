import styles from "./WelcomeBanner.module.css";

const DinoIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 3C6 3 4 5.5 4 8c0 2 .8 3.7 2 5l1 3h6l1-3c1.2-1.3 2-3 2-5 0-2.5-2-5-6-5z" />
    <path d="M9 16v4M15 16v4M7 20h10" />
  </svg>
);

const BoltIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function WelcomeBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          NOCNE SOWY · Mroczne ZakamARKi
        </div>
        <h2 className={styles.title}>
          Witaj w sklepie{" "}
          <span className={styles.titleAccent}>Nocnych Sów</span>
        </h2>
        <p className={styles.text}>
          Grasz na <strong>Mrocznych ZakamARKach</strong> i potrzebujesz
          przewagi? Trafiłeś we właściwe miejsce. Oferujemy wyselekcjonowane
          dino z mutowanymi statami, sprzęt Ascendant i blueprinty — wszystko
          hodowane i zdobywane przez tribe <strong>NOCNE SOWY</strong>.
        </p>
        <p className={`${styles.text} ${styles.text2}`}>
          Kliknij kartę produktu, skopiuj zamówienie i wyślij prv na Discord do:
        </p>
        <div className={styles.contacts}>
          <div className={styles.contact}>
            <span className={styles.contactIcon}>
              <DinoIcon />
            </span>
            <div className={styles.contactInfo}>
              <span className={styles.role}>Główna mutatorka</span>
              <span className={styles.name}>@Beerus</span>
            </div>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={`${styles.contact} ${styles.contactRose}`}>
            <span className={`${styles.contactIcon} ${styles.contactIconRose}`}>
              <BoltIcon />
            </span>
            <div className={styles.contactInfo}>
              <span className={styles.role}>Handel &amp; Good Boy</span>
              <span className={`${styles.name} ${styles.nameRose}`}>
                @Sedum
              </span>
            </div>
          </div>
        </div>
        <p className={styles.currency}>
          Waluta: <strong>d$</strong> — uczciwe ceny, terminowe dostawy.
        </p>
      </div>
    </div>
  );
}
