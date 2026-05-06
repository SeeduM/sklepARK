import styles from './DinoTypeFilter.module.css';

const TYPES = ['Wszystkie', 'WALKA', 'UŻYTKOWE', 'LATAJĄCE', 'WODNE', 'PET'];

export default function DinoTypeFilter({ active, onChange }) {
  return (
    <div className={styles.filters}>
      {TYPES.map(type => (
        <button
          key={type}
          className={`${styles.btn} ${active === type ? styles.active : ''}`}
          onClick={() => onChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
