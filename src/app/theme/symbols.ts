import { InjectionToken } from '@angular/core';

export const THEMES = new InjectionToken('THEMES');
export const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export interface Theme {
  key: string;
  name: string;
  icons: string;
}

export interface ThemeOptions {
  themes: Theme[];
  active: string;
}

export const DEFAULT_THEME = 'dark';
export const THEMES_LIST: Theme[] = [
  { key: 'light', name: 'THEMES.LIGHT', icons: 'dark' },
  { key: 'dark', name: 'THEMES.DARK', icons: 'light' },
];
export const LANGUAGES_LIST: any[] = [
  { key: 'en', name: 'LANGUAGES.ENGLISH' },
  { key: 'es', name: 'LANGUAGES.SPANISH' },
  { key: 'fr', name: 'LANGUAGES.FRENCH' },
];
