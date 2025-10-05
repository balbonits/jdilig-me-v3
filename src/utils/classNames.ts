/**
 * Combines class names from various formats into a single string
 *
 * @param classes - String, array of strings, or mix of both
 * @returns Combined class name string
 *
 * @example
 * // String format
 * cn('text-gray-500 bg-white') // => 'text-gray-500 bg-white'
 *
 * @example
 * // Array format (BEM pattern)
 * cn(['block', 'element', 'modifier']) // => 'block element modifier'
 *
 * @example
 * // Mixed formats
 * cn('base-class', ['block', 'element'], 'extra-class') // => 'base-class block element extra-class'
 */
export function cn(...classes: (string | string[] | undefined | null | false)[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}

export type ClassNameProp = string | string[];
