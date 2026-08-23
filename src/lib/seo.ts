// Title helpers.
//
// The root layout defines a `%s | Digital Magician` template, which silently
// adds 19 characters to every page title. That pushed 135 pages past the ~60
// character limit Google renders before truncating.
//
// pageTitle() returns a title for use with Next.js `title: { absolute }`,
// appending the brand only when the result still fits inside the limit.
// Keyword-bearing programmatic pages therefore spend their whole budget on the
// keyword, while shorter titles keep the brand.

const BRAND_SUFFIX = " | Digital Magician";
export const TITLE_MAX = 60;

export function pageTitle(core: string, max: number = TITLE_MAX): string {
  const trimmed = core.trim();
  return trimmed.length + BRAND_SUFFIX.length <= max
    ? `${trimmed}${BRAND_SUFFIX}`
    : trimmed;
}

/** Truncate a meta description at a word boundary, at most `max` characters. */
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "");
}
