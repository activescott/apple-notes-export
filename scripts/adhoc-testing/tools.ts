export function first<T>(iterable: Iterable<T>): T {
  for (const v of iterable) {
    return v
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* matchAll(str: string, regex: RegExp): IterableIterator<any> {
  let result
  while ((result = regex.exec(str)) !== null) {
    yield result
  }
}

export function getHtmlElementNames(html: string): string[] {
  const rx = /<(?<tagname>[\w.@]+)[^>]*>/gm
  const matches = Array.from(matchAll(html, rx))
  const tagNames = matches.map(m => m.groups["tagname"])
  const dict = {}
  tagNames.forEach(tagName => (dict[tagName] = 1))
  return Object.keys(dict)
}

/**
 * Returns true if the text appears to be a valid email address.
 */
export function isEmailAddress(text: string): boolean {
  // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(text)
}

/**
 * Apple Notes doesn't encode the < and > chars as html entities.
 * One place this shows up a lot is email address like `<scott@willeke.com>`.
 * So we attempt to find those here and replace them with properly encoded HTML.
 */
export function fixEmailAddressElements(html: string): string {
  return html.replace(
    /<([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/g,
    "&lt;$1&gt;"
  )
}
