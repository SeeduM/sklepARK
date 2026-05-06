import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryTabs from './components/CategoryTabs';
import DinoTypeFilter from './components/DinoTypeFilter';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import { useSheetData } from './hooks/useSheetData';
import styles from './App.module.css';

const CATEGORIES = ['Dinos', 'Armor', 'Weapons', 'Blueprints', 'Services', 'Saddles'];

export default function App() {
  const [category, setCategory] = useState('Dinos');
  const [dinoType, setDinoType] = useState('Wszystkie');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const { data, loading, error } = useSheetData(category);

  const filtered = useMemo(() => {
    let items = data;
    if (category === 'Dinos' && dinoType !== 'Wszystkie') {
      items = items.filter(p => p.type === dinoType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(p => p.name?.toLowerCase().includes(q));
    }
    return items;
  }, [data, category, dinoType, search]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setDinoType('Wszystkie');
    setSearch('');
    setSelected(null);
  };

  return (
    <>
      <Navbar />
      <CategoryTabs active={category} onChange={handleCategoryChange} />
      <main className={styles.main}>
        <div className={styles.toolbar}>
          {category === 'Dinos' && (
            <DinoTypeFilter active={dinoType} onChange={setDinoType} />
          )}
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <ProductGrid
          products={filtered}
          category={category}
          onSelect={setSelected}
          loading={loading}
          error={error}
        />
      </main>
      {selected && (
        <ProductModal
          product={selected}
          category={category}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
