import { useEffect } from 'react';
import type { PageMeta } from '@/data/pages';
import { PROFILE } from '@/data/profile';

/** Sets a `<meta>` tag's content, adding the tag if needed; `null` removes it. */
function setMeta(attr: 'name' | 'property', key: string, content: string | null) {
  const tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (content === null) {
    tag?.remove();
  } else if (tag) {
    tag.setAttribute('content', content);
  } else {
    const created = document.createElement('meta');
    created.setAttribute(attr, key);
    created.setAttribute('content', content);
    document.head.append(created);
  }
}

/** Sets the canonical `<link>`, adding it if needed; `null` removes it. */
function setCanonical(href: string | null) {
  const link = document.head.querySelector('link[rel="canonical"]');
  if (href === null) {
    link?.remove();
  } else if (link) {
    link.setAttribute('href', href);
  } else {
    const created = document.createElement('link');
    created.rel = 'canonical';
    created.href = href;
    document.head.append(created);
  }
}

/**
 * Gives the page its own title, description, and canonical URL. The site is a
 * single HTML file for every route, so without this each page shares the home
 * page's title and canonical URL: tabs and history all read the same, and
 * search engines see every page as a copy of the home page. Pages that are
 * `noindex` also drop their canonical URL.
 *
 * index.html ships the home page's title and description for visitors and
 * crawlers that don't run scripts, and no canonical URL.
 */
export function usePageMeta({
  title,
  description,
  path,
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setCanonical(noindex ? null : new URL(path, PROFILE.website).href);
    setMeta('name', 'robots', noindex ? 'noindex' : null);
  }, [title, description, path, noindex]);
}
