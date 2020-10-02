

export function arrayFromIterable<T>(iterable: IterableIterator<T>): T[] {
  console.log("arrayFromIterable...")
  const arr: T[] = []
  for (const item of iterable) {
    console.log("arrayFromIterable item!")
    arr.push(item)
  }
  console.log("arrayFromIterable.")
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
export function arrayToIterable<T, TMapped>(array: Array<T>, mapper: MapperFunction = identityMapper): Iterable<TMapped> {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
  const myIterable = {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < array.length; i++) {
        yield mapper(array[i])
      }
    }
  }
  return myIterable
}

interface MapperFunction {
  (item: any): any
}

function identityMapper<T>(item: T): T {
  return item
}


