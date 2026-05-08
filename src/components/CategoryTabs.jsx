import styles from './CategoryTabs.module.css';

const CATEGORIES = [
  { key: 'Dinos',      label: '🦖 Dinozaury' },
  { key: 'Weapons',    label: '⚔️ Bronie' },
  { key: 'Armor',      label: '🛡️ Zbroje' },
  { key: 'Saddles',    label: '🐎 Siodła' },
  { key: 'Blueprints', label: '📜 Blueprinty' },
  { key: 'Services',   label: '🔧 Usługi' },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className={styles.tabs}>
      {CATEGORIES.map(cat => (
        <button
          key={cat.key}
          className={`${styles.tab} ${active === cat.key ? styles.active : ''}`}
          onClick={() => onChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
