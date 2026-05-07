export const DINO_TYPES = [
  { code: 'wal', label: 'WALKA' },
  { code: 'uz',  label: 'UŻYTKOWE' },
  { code: 'lat', label: 'LATAJĄCE' },
  { code: 'pet', label: 'PET' },
  { code: 'wod', label: 'WODNE' },
];

export const DINO_ICONS = {
  wal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="19" x2="19" y2="5" />
      <line x1="14" y1="5" x2="19" y2="5" />
      <line x1="19" y1="10" x2="19" y2="5" />
      <line x1="5" y1="14" x2="5" y2="19" />
      <line x1="10" y1="19" x2="5" y2="19" />
    </svg>
  ),
  uz: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  lat: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6 6 2 10 2 14c0 2 2 4 4 2l6-4 6 4c2 2 4 0 4-2 0-4-4-8-10-12z" />
    </svg>
  ),
  pet: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="6" r="1.5" />
      <circle cx="17" cy="6" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="20" cy="12" r="1.5" />
      <path d="M12 14c-4 0-6 2-5 5 .5 1.5 2 2 3 1l2-1.5 2 1.5c1 1 2.5.5 3-1 1-3-1-5-5-5z" />
    </svg>
  ),
  wod: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L8 10a4 4 0 1 0 8 0L12 2z" />
    </svg>
  ),
};

export function getDinoLabel(code) {
  return DINO_TYPES.find(t => t.code === code)?.label ?? code;
}
