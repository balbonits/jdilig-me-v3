/**
 * Short, human-friendly form of a URL for display:
 * "https://www.linkedin.com/in/rjdilig/" → "linkedin.com/in/rjdilig",
 * "https://games.jdilig.me/games/maze/index.html" → "games.jdilig.me/games/maze".
 */
export function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/index\.html?$/, '')
    .replace(/\/$/, '');
}

/** "(909) 997-1393" → "tel:+19099971393". Assumes a US number. */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}
