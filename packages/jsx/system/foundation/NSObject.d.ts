// SEE https://developer.apple.com/documentation/objectivec/nsobject

/**
 * Defines the members of the NSObject class/type
 */
declare class NSObject<T extends NSObject<T>> {
  /**
   * Returns a new instance of the receiving class.
   */
  alloc: T
  /**
   * Implemented by subclasses to initialize a new object (the receiver) immediately after memory for it has been allocated.
   */
  init: T
}
