import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryTabs from './components/CategoryTabs';
import DinoTypeFilter from './components/DinoTypeFilter';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import { useSheetData } from './hooks/useSheetData';
import { useAllSheetData } from './hooks/useAllSheetData';
import WelcomeBanner from './components/WelcomeBanner';
import styles from './App.module.css';

export default function App() {
  const [category, setCategory] = useState('Dinos');
  const [dinoType, setDinoType] = useState('Wszystkie');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const { data: categoryData, loading: catLoading, error } = useSheetData(category);
  const { data: allData, loading: allLoading } = useAllSheetData();

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (isSearching) {
      return allData.filter(p => p.name?.toLowerCase().includes(q));
    }

    let items = categoryData;
    if (category === 'Dinos' && dinoType !== 'Wszystkie') {
      items = items.filter(p =>
        p.type?.split(',').map(t => t.trim()).includes(dinoType)
      );
    }
    return items;
  }, [categoryData, allData, category, dinoType, search, isSearching]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setDinoType('Wszystkie');
    setSearch('');
    setSelected(null);
  };

  // Przy wyszukiwaniu kategoria produktu pochodzi z _category
  const getProductCategory = (product) =>
    isSearching ? (product._category || category) : category;

  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <CategoryTabs active={category} onChange={handleCategoryChange} />
      <main className={styles.main}>
        <div className={styles.toolbar}>
          {category === 'Dinos' && !isSearching && (
            <DinoTypeFilter active={dinoType} onChange={setDinoType} />
          )}
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <ProductGrid
          products={filtered}
          category={category}
          getProductCategory={isSearching ? getProductCategory : null}
          onSelect={setSelected}
          loading={isSearching ? allLoading : catLoading}
          error={error}
        />
      </main>
      {selected && (
        <ProductModal
          product={selected}
          category={getProductCategory(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
