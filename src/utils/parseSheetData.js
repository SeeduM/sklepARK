// Parser odpowiedzi gviz API z Google Sheets
export function parseSheetData(text) {
  const json = JSON.parse(text.substring(47).slice(0, -2));
  const cols = json.table.cols.map(c => c.label);
  return json.table.rows.map(row => {
    const obj = {};
    row.c.forEach((cell, i) => {
      obj[cols[i]] = cell ? cell.v : null;
    });
    return obj;
  });
}
