import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, category, onSelect, loading, error }) {
  if (loading) return <p className={styles.info}>Ładowanie...</p>;
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
