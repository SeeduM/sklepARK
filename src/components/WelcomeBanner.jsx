import styles from "./WelcomeBanner.module.css";

const BASE = import.meta.env.BASE_URL;

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
            <img
              src={`${BASE}images/beerus.webp`}
              alt="Avatar Beerus"
              className={styles.avatar}
            />
            <div className={styles.contactInfo}>
              <span className={styles.role}>Główna mutatorka</span>
              <span className={styles.name}>@Beerus</span>
              <span className={styles.desc}>
                Specjalistka od mutacji — hoduje dino z najlepszymi statami
              </span>
            </div>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={`${styles.contact} ${styles.contactGold}`}>
            <img
              src={`${BASE}images/sedum.webp`}
              alt="Avatar Sedum"
              className={`${styles.avatar} ${styles.avatarGold}`}
            />
            <div className={styles.contactInfo}>
              <span className={styles.role}>Handel &amp; Good Boy</span>
              <span className={`${styles.name} ${styles.nameGold}`}>
                @Sedum
              </span>
              <span className={styles.desc}>
                Obsługuje zamówienia, dostarcza towar i się nie gubi
              </span>
            </div>
          </div>
        </div>
        <p className={styles.currency}>
          Waluta: <strong>d$</strong> — uczciwe ceny, terminowe dostawy.
        </p>
        <a
          href="https://mroczne-zakamarki.pl/kalkulator/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.calcLink}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="10" y2="10" />
            <line x1="14" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="10" y2="14" />
            <line x1="14" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="10" y2="18" />
            <line x1="14" y1="18" x2="16" y2="18" />
          </svg>
          Link do KALKULATORA
        </a>
      </div>
    </div>
  );
}
