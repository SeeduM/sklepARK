import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, category, onSelect, loading, error }) {
  if (loading) return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
  if (error) return <p className={styles.info}>Błąd: {error}</p>;
  if (!products.length) return <p className={styles.info}>Brak produktów.</p>;

  return (
    <div className={styles.grid}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} category={category} onClick={() => onSelect(p)} />
      ))}
    </div>
  );
}
