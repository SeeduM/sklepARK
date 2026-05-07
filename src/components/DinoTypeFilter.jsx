import styles from './DinoTypeFilter.module.css';
import { DINO_TYPES, DINO_ICONS } from '../utils/dinoTypes';

export default function DinoTypeFilter({ active, onChange }) {
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.btn} ${active === 'Wszystkie' ? styles.active : ''}`}
        onClick={() => onChange('Wszystkie')}
      >
        Wszystkie
      </button>
      {DINO_TYPES.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.btn} ${active === code ? styles.active : ''}`}
          onClick={() => onChange(code)}
        >
          <span className={styles.icon}>{DINO_ICONS[code]}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
