import { Country } from '../types';

export const COUNTRIES: Country[] = [
  { name: 'Argentina', code: 'ar', flagUrl: 'https://flagcdn.com/w320/ar.png' },
  { name: 'Australia', code: 'au', flagUrl: 'https://flagcdn.com/w320/au.png' },
  { name: 'Austria', code: 'at', flagUrl: 'https://flagcdn.com/w320/at.png' },
  { name: 'Belgium', code: 'be', flagUrl: 'https://flagcdn.com/w320/be.png' },
  { name: 'Bulgaria', code: 'bg', flagUrl: 'https://flagcdn.com/w320/bg.png' },
  { name: 'Canada', code: 'ca', flagUrl: 'https://flagcdn.com/w320/ca.png' },
  { name: 'Czech Republic', code: 'cz', flagUrl: 'https://flagcdn.com/w320/cz.png' },
  { name: 'Denmark', code: 'dk', flagUrl: 'https://flagcdn.com/w320/dk.png' },
  { name: 'Finland', code: 'fi', flagUrl: 'https://flagcdn.com/w320/fi.png' },
  { name: 'France', code: 'fr', flagUrl: 'https://flagcdn.com/w320/fr.png' },
  { name: 'Germany', code: 'de', flagUrl: 'https://flagcdn.com/w320/de.png' },
  { name: 'Hong Kong', code: 'hk', flagUrl: 'https://flagcdn.com/w320/hk.png' },
  { name: 'Hungary', code: 'hu', flagUrl: 'https://flagcdn.com/w320/hu.png' },
  { name: 'India', code: 'in', flagUrl: 'https://flagcdn.com/w320/in.png' },
  { name: 'Italy', code: 'it', flagUrl: 'https://flagcdn.com/w320/it.png' },
  { name: 'Japan', code: 'jp', flagUrl: 'https://flagcdn.com/w320/jp.png' },
  { name: 'Mexico', code: 'mx', flagUrl: 'https://flagcdn.com/w320/mx.png' },
  { name: 'Netherlands', code: 'nl', flagUrl: 'https://flagcdn.com/w320/nl.png' },
  { name: 'New Zealand', code: 'nz', flagUrl: 'https://flagcdn.com/w320/nz.png' },
  { name: 'Norway', code: 'no', flagUrl: 'https://flagcdn.com/w320/no.png' },
  { name: 'Poland', code: 'pl', flagUrl: 'https://flagcdn.com/w320/pl.png' },
  { name: 'Singapore', code: 'sg', flagUrl: 'https://flagcdn.com/w320/sg.png' },
  { name: 'Spain', code: 'es', flagUrl: 'https://flagcdn.com/w320/es.png' },
  { name: 'Sweden', code: 'se', flagUrl: 'https://flagcdn.com/w320/se.png' },
  { name: 'Taiwan', code: 'tw', flagUrl: 'https://flagcdn.com/w320/tw.png' },
  { name: 'Thailand', code: 'th', flagUrl: 'https://flagcdn.com/w320/th.png' },
  { name: 'United Kingdom', code: 'gb', flagUrl: 'https://flagcdn.com/w320/gb.png' },
];

export function getRandomCountries(exclude: Country, count: number): Country[] {
  const pool = COUNTRIES.filter((c) => c.code !== exclude.code);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function buildOptions(correct: Country): Country[] {
  const wrong = getRandomCountries(correct, 3);
  const all = [...wrong, correct].sort(() => Math.random() - 0.5);
  return all;
}
