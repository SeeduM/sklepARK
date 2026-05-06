import { useState, useEffect } from 'react';
import { parseSheetData } from '../utils/parseSheetData';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;

// Pobiera dane z zakładki Google Sheets przez gviz API
export function useSheetData(sheetName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!SHEET_ID) {
      setError('Brak VITE_SHEET_ID w pliku .env');
      setLoading(false);
      return;
    }

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    fetch(url)
      .then(res => res.text())
      .then(text => {
        setData(parseSheetData(text));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [sheetName]);

  return { data, loading, error };
}
