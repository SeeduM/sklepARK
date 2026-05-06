import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Szukaj produktu..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
