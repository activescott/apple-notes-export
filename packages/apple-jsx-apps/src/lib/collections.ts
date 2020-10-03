/// <reference types="@activescott/apple-jsx-env" />

export function arrayFromIterable<T>(iterable: IterableIterator<T>): T[] {
  const arr: T[] = []
  for (const item of iterable) {
    arr.push(item)
  }
  return arr
}

/**
 * JSX ["element arrays"](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW9) are not JavaScript arrays and as a result are not iterable. This makes them so. Use like:
 * ```
 * myField = arrayToIterable(theElementArray, (item) => item)
 * ```
 * @param array The JSX array to make iterable.
 * @param mapper The mapping function if needed.
 */
export function arrayToIterable<T, TMapped>(
  array: Array<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: (item: T) => TMapped = (item) => (item as any) as TMapped
): Iterable<TMapped> {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
  const myIterable = {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < array.length; i++) {
        yield mapper(array[i])
      }
    },
  }
  return myIterable
}
