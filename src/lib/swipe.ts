/**
 * Turns a finished one-finger touch into a gallery step. A mostly horizontal
 * move of at least `minDistance` px goes to the next image when it moves left
 * (1) and the previous one when it moves right (-1). Taps, jitter, and
 * vertical moves return 0.
 */
export function swipeStep(dx: number, dy: number, minDistance = 50): -1 | 0 | 1 {
  if (Math.abs(dx) < minDistance || Math.abs(dx) < Math.abs(dy) * 1.5) return 0;
  return dx < 0 ? 1 : -1;
}
