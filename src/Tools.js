export class Tools {
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static first(iterable) {
    for (let v of iterable) {
      return v
    }
  }

  static *matchAll(str, regex) {
    let result
    while ((result = regex.exec(str)) !== null) {
      yield result
    }
  }

  static getHtmlElementNames(html) {
    const rx = /<(?<tagname>[\w\.@]+)[^>]*>/gm
    const matches = Array.from(Tools.matchAll(html, rx))
    const tagNames = matches.map(m => m.groups["tagname"])
    const dict = {}
    tagNames.forEach(tagName => (dict[tagName] = 1))
    return Object.keys(dict)
  }

  /**
   * Returns true if the text appears to be a valid email address.
   */
  static isEmailAddress(text) {
    // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(text)
  }

  /**
   * Apple Notes doesn't encode the < and > chars as html entities.
   * One place this shows up a lot is email address like `<scott@willeke.com>`.
   * So we attempt to find those here and replace them with properly encoded HTML.
   */
  static fixEmailAddressElements(html) {
    return html.replace(
      /<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/g,
      "&lt;$1&gt;"
    )
  }
}
