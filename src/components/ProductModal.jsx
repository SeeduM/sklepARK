import { useState } from 'react';
import { generateOrderText } from '../utils/orderText';
import AvailabilityBadge from './AvailabilityBadge';
import styles from './ProductModal.module.css';

function DinoStats({ p }) {
  const stat = (label, base, mut) => (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span>{base} {mut ? <span className={styles.mut}>+{mut} mut</span> : <span className={styles.base}>bazowe</span>}</span>
    </div>
  );
  return (
    <div className={styles.stats}>
      {stat('HP', p.hp_base, p.hp_mut)}
      {stat('DMG', p.dmg_base, p.dmg_mut)}
      {stat('STM', p.stm_base, p.stm_mut)}
      {stat('WAGA', p.weight_base, p.weight_mut)}
    </div>
  );
}

export default function ProductModal({ product, category, onClose }) {
  const [toast, setToast] = useState(false);

  const handleCopy = () => {
    const text = generateOrderText(product, category);
    navigator.clipboard.writeText(text).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <img
          src={product.image_url || '/images/placeholder.jpg'}
          alt={product.name}
          className={styles.image}
          onError={e => { e.target.src = '/images/placeholder.jpg'; }}
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <h2 className={styles.name}>{product.name}</h2>
            <AvailabilityBadge available={product.available} />
          </div>

          {category === 'Dinos' && (
            <div className={styles.meta}>
              <span>{product.type}</span>
              <span>Poziom: <strong>{product.level}</strong></span>
            </div>
          )}
          {product.quality && <p className={styles.detail}>Jakość: <strong>{product.quality}</strong></p>}
          {product.weapon_type && <p className={styles.detail}>Typ: <strong>{product.weapon_type}</strong></p>}
          {product.dino_name && <p className={styles.detail}>Dla: <strong>{product.dino_name}</strong></p>}
          {product.bp_category && <p className={styles.detail}>Kategoria: <strong>{product.bp_category}</strong></p>}

          {category === 'Dinos' && <DinoStats p={product} />}

          {product.description && <p className={styles.desc}>{product.description}</p>}

          <button className={styles.copyBtn} onClick={handleCopy}>
            📋 Kopiuj zamówienie
          </button>
          {toast && <p className={styles.toast}>✅ Skopiowano! Wklej na Discord.</p>}
        </div>
      </div>
    </div>
  );
}
