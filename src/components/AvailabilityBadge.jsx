import styles from './AvailabilityBadge.module.css';

export default function AvailabilityBadge({ available }) {
  return (
    <span className={available ? styles.available : styles.unavailable}>
      {available ? 'Dostępny' : 'Niedostępny'}
    </span>
  );
}
