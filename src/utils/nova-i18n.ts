import copy from '@data/i18n/nova.json';

export type NovaLocale = 'pl' | 'en';

type NovaNavigationCta = {
  label: string;
  hoverLabel: string;
  href: string;
};

type NovaCopy = Omit<typeof copy.pl, 'navigation'> & {
  navigation: Omit<typeof copy.pl.navigation, 'cta'> & {
    cta: NovaNavigationCta | null;
  };
};

export function getNovaCopy(locale: NovaLocale = 'pl') {
  return (copy[locale] ?? copy.pl) as NovaCopy;
}

export function getNovaSectionCopy(locale: NovaLocale, dataKey?: string) {
  if (!dataKey) return undefined;
  return getNovaCopy(locale).sections[dataKey as keyof typeof copy.pl.sections];
}

function withNovaBase(path: string): string {
  const configuredBase = process.env.PUBLIC_BASE_PATH || import.meta.env.BASE_URL;
  const base = configuredBase === '/'
    ? ''
    : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;
  return `${base}${path}` || '/';
}

export function getNovaLocalePath(locale: NovaLocale, currentPath = '/'): string {
  const englishProject = currentPath.match(/^\/projects\/([^/]+)\/?$/);
  const spanishProject = currentPath.match(/^\/proyectos\/([^/]+)\/?$/);
  const legalPage = currentPath.match(/^\/(?:pl\/)?(cookies|polityka-prywatnosci)\/?$/);
  const quotePage = /^\/(?:pl\/cotizar|quote)\/?$/.test(currentPath);

  if (locale === 'en' && spanishProject) {
    return withNovaBase(`/projects/${spanishProject[1]}/`);
  }
  if (locale === 'pl' && englishProject) {
    return withNovaBase(`/proyectos/${englishProject[1]}/`);
  }
  if (quotePage) {
    return withNovaBase(locale === 'en' ? '/quote/' : '/pl/cotizar/');
  }
  if (legalPage) {
    const path = legalPage[1] === 'cookies'
      ? (locale === 'en' ? '/cookies/' : '/pl/cookies/')
      : (locale === 'en' ? '/polityka-prywatnosci/' : '/pl/polityka-prywatnosci/');
    return withNovaBase(path);
  }

  return withNovaBase(locale === 'en' ? '/' : '/pl/');
}

export function getNovaNavigationPath(href: string, locale: NovaLocale, currentPath = '/'): string {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  if (href.startsWith('#')) {
    const currentPage = currentPath.replace(/\/+$/, '') || '/';
    const homePage = locale === 'en' ? '/' : '/pl';
    return currentPage === homePage
      ? href
      : withNovaBase(`${locale === 'en' ? '/' : '/pl/'}${href}`);
  }

  const normalized = href.startsWith('/') ? href : `/${href}`;
  if (locale === 'en') return withNovaBase(normalized);
  return withNovaBase(normalized === '/' ? '/pl/' : `/pl${normalized}`);
}
