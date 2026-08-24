import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { apolloClient } from './apolloClient';
import {
  GET_LANDING_PAGE,
  GET_LANDING_TRANSLATIONS,
  LANDING_PAGE_URI,
  type SupportedLocale,
} from './queries';
import type { WpLandingPage, WpTranslationIndex } from '../types/wordpress';

const REQUEST_TIMEOUT_MS = 8000;

function logQueryError(context: string, error: unknown): void {
  if (CombinedGraphQLErrors.is(error)) {
    // Distinct from a network outage: the request reached WPGraphQL and it
    // rejected the query (bad field, validation error, resolver error, ...)
    // — surfaced explicitly so a broken query doesn't read as "WordPress is
    // down" at dev time.
    console.warn(`[wpGraphQL] ${context} — GraphQL errors:`, error.errors);
  } else {
    console.warn(`[wpGraphQL] ${context} — request error:`, error instanceof Error ? error.message : error);
  }
}

// Locale -> WordPress databaseId for the landing page's translation group.
// idType: URI is not WPML-locale-aware (every locale-prefixed URI resolves
// to the same default-language post), so this is resolved once via the
// canonical URI + WPML's `translations` field, then reused for every
// locale switch. Memoized for the session; a failed resolve clears the
// cache so the next call retries instead of permanently falling back.
let translationMapPromise: Promise<Partial<Record<SupportedLocale, number>>> | null = null;

async function resolveTranslationMapOnce(): Promise<Partial<Record<SupportedLocale, number>>> {
  const result = await apolloClient.query<{ page: WpTranslationIndex | null }>({
    query: GET_LANDING_TRANSLATIONS,
    variables: { uri: LANDING_PAGE_URI },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  if (result.error) {
    logQueryError('translation index', result.error);
    throw result.error;
  }

  const page = result.data?.page;
  if (!page) {
    throw new Error(`No page found at canonical URI "${LANDING_PAGE_URI}" while resolving translations.`);
  }

  const map: Partial<Record<SupportedLocale, number>> = {};
  const add = (languageCode: string | null | undefined, databaseId: number) => {
    const code = languageCode?.toLowerCase();
    if (code === 'en' || code === 'fr' || code === 'es') {
      map[code] = databaseId;
    }
  };

  // The queried node never includes itself in `translations` — confirmed
  // live both directions (en -> [fr, es], fr -> [en, es]) — so its own
  // language has to be added explicitly.
  add(page.languageCode, page.databaseId);
  for (const t of page.translations ?? []) {
    add(t.languageCode, t.databaseId);
  }

  return map;
}

async function resolveTranslationMap(): Promise<Partial<Record<SupportedLocale, number>> | null> {
  if (!translationMapPromise) {
    translationMapPromise = resolveTranslationMapOnce().catch((error) => {
      translationMapPromise = null;
      throw error;
    });
  }

  try {
    return await translationMapPromise;
  } catch {
    return null;
  }
}

async function fetchLandingPageInner(locale: SupportedLocale): Promise<WpLandingPage | null> {
  const map = await resolveTranslationMap();
  const databaseId = map?.[locale];

  if (databaseId == null) {
    console.warn(`[wpGraphQL] No translation linked for locale "${locale}", falling back to static content.`);
    return null;
  }

  const result = await apolloClient.query<{ page: WpLandingPage | null }>({
    query: GET_LANDING_PAGE,
    variables: { databaseId },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  if (result.error) {
    logQueryError(`content for locale "${locale}"`, result.error);
    return null;
  }

  if (!result.data?.page) {
    console.warn(`[wpGraphQL] No page found for locale "${locale}" (databaseId: ${databaseId}), falling back to static content.`);
    return null;
  }

  return result.data.page;
}

/**
 * Fetches the landing page content from WordPress for the given locale.
 * Never throws — returns null on any failure (network down, timeout, GraphQL
 * errors, missing translation) so callers can fall back to static data.
 */
export async function fetchLandingPage(locale: SupportedLocale): Promise<WpLandingPage | null> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('WPGraphQL request timed out')), REQUEST_TIMEOUT_MS);
  });

  try {
    return await Promise.race([fetchLandingPageInner(locale), timeout]);
  } catch (error) {
    console.warn('[wpGraphQL] Request failed, falling back to static content:', error instanceof Error ? error.message : error);
    return null;
  }
}
