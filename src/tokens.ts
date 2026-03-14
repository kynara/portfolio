/**
 * tokens.ts — JS mirror of tokens.css.
 *
 * Used anywhere a CSS custom property can't be passed directly (e.g. inline-style
 * props on third-party components like AwesomeBtn).
 *
 * Keep this file in sync with src/tokens.css.
 */

export const colors = {
  /* ── Core brand ─────────────────────────────────────── */
  yellow:     '#ffe45c',
  blue:       '#5478ff',
  blueDark:   '#2006c6',
  red:        '#f02d3a',
  redDark:    '#dd0426',

  /* ── Tints ──────────────────────────────────────────── */
  yellowDim:  '#c9b030',
  blueLight:  '#8fa5ff',
  redLight:   '#ff6b75',

  /* ── Page backgrounds ───────────────────────────────── */
  bgPage:     '#130477',
  bgNavy:     '#0a0820',

  /* ── Text ───────────────────────────────────────────── */
  textMuted:  '#637081',
  textBody:   '#a8bcd0',
  textBright: '#e8edf5',
  white:      '#ffffff',
  textDark:   '#06060e',
} as const;

