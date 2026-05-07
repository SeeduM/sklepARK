import AvailabilityBadge from './AvailabilityBadge';
import styles from './ProductCard.module.css';

function getSubtitle(product, category) {
  if (category === 'Dinos') return `${product.type} • Lvl ${product.level}`;
  if (product.quality) return product.quality;
  if (product.weapon_type) return product.weapon_type;
  if (product.dino_name) return `Dla: ${product.dino_name}`;
  return '';
}

export default function ProductCard({ product, category, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrap}>
        <img
          src={product.image_url || '/images/placeholder.jpg'}
          alt={product.name}
          className={styles.image}
          onError={e => { e.target.src = '/images/placeholder.jpg'; }}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.subtitle}>{getSubtitle(product, category)}</p>
        <div className={styles.footer}>
          <AvailabilityBadge available={product.available} />
          <span className={styles.price}>
            Cena: <strong>{product.price || 'z kalkulatora'}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
