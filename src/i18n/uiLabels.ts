// UI-only labels that have no ACF field — chrome text the component itself
// needs (a fixed word, a punctuation convention) rather than editorial
// content from WordPress. Kept in its own module, separate from
// normalizeLandingPage.ts, because it has nothing to do with the WP→UI
// transformation the adapter does: there's no WP shape to normalize here,
// just a locale key to a fixed set of strings. The adapter still owns
// *selecting* the right entry (via `wp.language?.code`, the same signal the
// old dayLabelsFor() used) and attaches the result to LandingData, so
// components never branch on locale themselves.
export type UiLocale = 'en' | 'fr' | 'es';

export interface UiLabels {
  // "Étape 1" / "Step 1" / "Paso 1" — Process.tsx step pill, no ACF field.
  stepLabel: string;
  // "Client • Montréal" — Testimonials.tsx attribution line, no ACF field.
  clientLabel: string;
  // Typographic quote marks are locale-dependent, so they live in the
  // dictionary rather than as a CSS `quotes` rule — one place controls both
  // the mark and (for French) the thin space next to it.
  quoteOpen: string;
  quoteClose: string;
}

const UI_LABELS: Record<UiLocale, UiLabels> = {
  fr: {
    stepLabel: 'Étape',
    clientLabel: 'Client',
    // U+202F NARROW NO-BREAK SPACE inside the guillemets, per French
    // typographic convention.
    quoteOpen: '« ',
    quoteClose: ' »',
  },
  en: {
    stepLabel: 'Step',
    clientLabel: 'Client',
    quoteOpen: '“',
    quoteClose: '”',
  },
  es: {
    stepLabel: 'Paso',
    clientLabel: 'Cliente',
    // Curly quotes kept consistent with EN rather than « » — explicit
    // instruction, even though « » is also valid Spanish typography.
    quoteOpen: '“',
    quoteClose: '”',
  },
};

function normalizeUiLocale(languageCode: string | null | undefined): UiLocale {
  const code = languageCode?.toLowerCase();
  if (code === 'en' || code === 'es') return code;
  return 'fr';
}

export function getUiLabels(languageCode: string | null | undefined): UiLabels {
  return UI_LABELS[normalizeUiLocale(languageCode)];
}
