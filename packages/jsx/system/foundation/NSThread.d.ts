/**
 * A thread of execution.
 * https://developer.apple.com/documentation/foundation/nsthread?language=objc
 */
declare class NSThread extends NSObject<NSThread> {
  /**
   *
   * @param ti A number of seconds.
   */
  public sleepForTimeInterval(ti: NSTimeInterval): void
}

type NSTimeInterval = number
