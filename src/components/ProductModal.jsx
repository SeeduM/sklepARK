import { useState, useEffect } from 'react';
import { generateOrderText } from '../utils/orderText';
import AvailabilityBadge from './AvailabilityBadge';
import styles from './ProductModal.module.css';
import { DINO_ICONS, getDinoLabel } from '../utils/dinoTypes';

const STAT_META = {
  HP:   {
    color: '#10b981',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  DMG:  {
    color: '#ef4444',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="20" x2="20" y2="4" />
        <line x1="10" y1="6" x2="18" y2="14" />
        <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <line x1="20" y1="4" x2="4" y2="20" />
        <line x1="14" y1="18" x2="6" y2="10" />
        <circle cx="20" cy="4" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  STM:  {
    color: '#38bdf8',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  WAGA: {
    color: '#c4a068',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="5" y1="16" x2="19" y2="16" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
      </svg>
    ),
  },
};

function DinoStats({ p }) {
  const stat = (key, base, mut) => {
    const meta = STAT_META[key];
    return (
      <div className={styles.stat} key={key}>
        <span className={styles.statLabel} style={{ color: meta.color }}>
          <span className={styles.statIcon}>{meta.icon}</span>
          {key}
        </span>
        <span>{base} {mut ? <span className={styles.mut}>+{mut} mut</span> : <span className={styles.base}>bazowe</span>}</span>
      </div>
    );
  };
  return (
    <div className={styles.stats}>
      {stat('HP',   p.hp_base,     p.hp_mut)}
      {stat('DMG',  p.dmg_base,    p.dmg_mut)}
      {stat('STM',  p.stm_base,    p.stm_mut)}
      {stat('WAGA', p.weight_base, p.weight_mut)}
    </div>
  );
}

function getYtId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function ProductModal({ product, category, onClose }) {
  const [toast, setToast] = useState(false);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Back button closes modal
  useEffect(() => {
    history.pushState(null, '');
    const onPop = () => onClose();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [onClose]);

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
        <button className={styles.close} onClick={onClose} aria-label="Zamknij">×</button>
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
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Cena</span>
            <span className={styles.priceValue}>
              {product.price || 'z kalkulatora'}
            </span>
          </div>

          {category === 'Dinos' && (
            <div className={styles.meta}>
              <span className={styles.typeIcons}>
                {product.type?.split(',').map(t => t.trim()).map(code => (
                  <span key={code} className={styles.typeIcon} title={getDinoLabel(code)}>
                    {DINO_ICONS[code] ?? code}
                  </span>
                ))}
              </span>
              <span>Poziom: <strong>{product.level}</strong></span>
            </div>
          )}
          {product.quality && (
            <p className={styles.detail}>
              {category === 'Weapons' ? 'DMG' : (category === 'Armor' || category === 'Saddles') ? 'Armor' : category === 'Blueprints' ? 'DMG/ARM' : 'Jakość'}:{' '}
              <strong>{product.quality}</strong>
            </p>
          )}
          {product.weapon_type && <p className={styles.detail}>Typ: <strong>{product.weapon_type}</strong></p>}
          {product.dino_name && <p className={styles.detail}>Dla: <strong>{product.dino_name}</strong></p>}
          {product.bp_category && <p className={styles.detail}>Kategoria: <strong>{product.bp_category}</strong></p>}

          {category === 'Dinos' && <DinoStats p={product} />}

          {product.description && <p className={styles.desc}>{product.description}</p>}

          {getYtId(product.yt_url) && (
            <a
              href={product.yt_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ytThumb}
            >
              <img
                src={`https://img.youtube.com/vi/${getYtId(product.yt_url)}/hqdefault.jpg`}
                alt="Zobacz na YouTube"
                className={styles.ytImg}
              />
              <span className={styles.ytPlay} aria-hidden="true">▶</span>
            </a>
          )}

          {product.extra_img && (
            <div className={styles.accordion}>
              <button
                className={styles.detailBtn}
                onClick={() => setShowExtra(v => !v)}
                aria-expanded={showExtra}
              >
                <span>Szczegóły</span>
                <svg
                  className={`${styles.arrow} ${showExtra ? styles.arrowOpen : ''}`}
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`${styles.extraPanel} ${showExtra ? styles.extraPanelOpen : ''}`}>
                <img
                  src={product.extra_img}
                  alt="Szczegóły"
                  className={styles.extraImg}
                />
              </div>
            </div>
          )}

          <button className={styles.copyBtn} onClick={handleCopy}>
            Kopiuj zamówienie
          </button>
          {toast && <p className={styles.toast}>Skopiowano! Wklej na Discord.</p>}
        </div>
      </div>
    </div>
  );
}
