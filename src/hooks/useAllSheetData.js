import { useState, useEffect } from 'react';
import { parseSheetData } from '../utils/parseSheetData';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const ALL_SHEETS = ['Dinos', 'Weapons', 'Armor', 'Saddles', 'Blueprints', 'Services'];

export function useAllSheetData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SHEET_ID) { setLoading(false); return; }

    const fetches = ALL_SHEETS.map(sheet =>
      fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheet}&headers=1`)
        .then(r => r.text())
        .then(text => parseSheetData(text).map(item => ({ ...item, _category: sheet })))
        .catch(() => [])
    );

    Promise.all(fetches).then(results => {
      setData(results.flat());
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
