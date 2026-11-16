export type OverlayKey = 'about' | 'work' | 'experience' | 'skills' | 'contact';

export const NAV: { key: OverlayKey; label: string; index: string }[] = [
  { key: 'about', label: 'About', index: '01' },
  { key: 'work', label: 'Work', index: '02' },
  { key: 'experience', label: 'Experience', index: '03' },
  { key: 'skills', label: 'Skills', index: '04' },
  { key: 'contact', label: 'Contact', index: '05' },
];
