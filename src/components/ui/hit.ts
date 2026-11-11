/**
 * Grows a target's hit area to at least 44x44 px with no visual change: a transparent
 * ::before, centred on the element, extends it only where it's smaller than 44px
 * (same technique as the header brand link, PR #25). The element becomes position: relative.
 */
export const HIT_44 =
  "relative before:absolute before:content-[''] before:inset-x-[min(0px,calc((100%_-_44px)/2))] before:inset-y-[min(0px,calc((100%_-_44px)/2))]";
