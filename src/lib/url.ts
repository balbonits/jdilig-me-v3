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
