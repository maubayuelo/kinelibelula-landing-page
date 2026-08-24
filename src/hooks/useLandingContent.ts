import { useEffect, useState } from 'react';
import { fetchLandingPage } from '../services/wpGraphQL';
import type { SupportedLocale } from '../services/queries';
import { normalizeLandingPage, STATIC_FALLBACK, type LandingData } from '../adapters/normalizeLandingPage';

export interface UseLandingContentResult {
  data: LandingData;
  isLoading: boolean;
  isWordPress: boolean;
  error: string | null;
}

/**
 * Loads landing page content for the given locale, live from WordPress when
 * available. `data` is never null — it starts (and stays, on any failure) as
 * the static fallback, so the page always renders and the language switcher
 * never shows a blank state. Re-runs whenever `locale` changes.
 */
export function useLandingContent(locale: SupportedLocale): UseLandingContentResult {
  console.log('[useLandingContent] active locale:', locale);
  const [data, setData] = useState<LandingData>(STATIC_FALLBACK);
  const [isLoading, setIsLoading] = useState(true);
  const [isWordPress, setIsWordPress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchLandingPage(locale)
      .then((wp) => {
        if (cancelled) return;
        setData(normalizeLandingPage(wp, STATIC_FALLBACK));
        setIsWordPress(wp !== null);
        if (wp === null) {
          setError(`No live WordPress content for locale "${locale}" — showing static fallback.`);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setData(STATIC_FALLBACK);
        setIsWordPress(false);
        setError(err instanceof Error ? err.message : 'Failed to load landing content.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { data, isLoading, isWordPress, error };
}
