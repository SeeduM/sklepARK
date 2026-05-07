// Parser odpowiedzi gviz API z Google Sheets
export function parseSheetData(text) {
  const json = JSON.parse(text.substring(47).slice(0, -2));
  let cols = json.table.cols.map(c => c.label);
  let rows = json.table.rows;

  // Fallback: jeśli gviz nie rozpoznał nagłówków, użyj pierwszego wiersza
  if (cols.every(l => !l) && rows.length > 0) {
    cols = rows[0].c.map(cell => (cell ? cell.v : ''));
    rows = rows.slice(1);
  }

  return rows.map(row => {
    const obj = {};
    row.c.forEach((cell, i) => {
      obj[cols[i]] = cell ? cell.v : null;
    });
    return obj;
  });
}
