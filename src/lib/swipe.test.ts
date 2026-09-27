import { describe, expect, it } from 'vitest';
import { swipeStep } from './swipe';

describe('swipeStep', () => {
  it('swiping left goes to the next image', () => {
    expect(swipeStep(-80, 10)).toBe(1);
  });

  it('swiping right goes to the previous image', () => {
    expect(swipeStep(80, -10)).toBe(-1);
  });

  it('ignores short moves, like taps and jitter', () => {
    expect(swipeStep(-49, 0)).toBe(0);
    expect(swipeStep(0, 0)).toBe(0);
  });

  it('ignores mostly vertical moves', () => {
    expect(swipeStep(-60, 60)).toBe(0);
    expect(swipeStep(20, -200)).toBe(0);
  });
});
