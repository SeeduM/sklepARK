// Generator tekstu zamówienia do wklejenia na Discord
export function generateOrderText(product, category) {
  const sep = '━━━━━━━━━━━━━━━━━━';
  const price = product.price ? `Cena: ${product.price}` : 'Cena: z kalkulatora';

  if (category === 'Dinos') {
    const mut = (base, mut) => mut ? `${base} (+${mut} mut)` : `${base} (bazowe)`;
    return `🦖 ZAMÓWIENIE - ${product.name}
${sep}
Level: ${product.level}

Statystyki:
• HP:    ${mut(product.hp_base, product.hp_mut)}
• DMG:   ${mut(product.dmg_base, product.dmg_mut)}
• STM:   ${mut(product.stm_base, product.stm_mut)}
• WAGA:  ${mut(product.weight_base, product.weight_mut)}

Status: ${product.available ? 'Dostępny' : 'Niedostępny'}
${price}
${sep}`;
  }

  const icons = { Armor: '🛡️', Weapons: '⚔️', Blueprints: '📜', Services: '🔧', Saddles: '🐎' };
  const icon = icons[category] || '📦';

  let details = '';
  if (product.quality) details += `\nJakość: ${product.quality}`;
  if (product.weapon_type) details += `\nTyp broni: ${product.weapon_type}`;
  if (product.bp_category) details += `\nKategoria: ${product.bp_category}`;
  if (product.dino_name) details += `\nDla dino: ${product.dino_name}`;

  return `${icon} ZAMÓWIENIE - ${product.name}
${sep}${details}

Status: ${product.available ? 'Dostępny' : 'Niedostępny'}
${price}
${sep}`;
}
