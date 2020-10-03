/**
 * Namespace to represent the Dispatch framework in Objective-C/macOS.
 * See https://developer.apple.com/documentation/dispatch
 */
declare namespace Dispatch {
  /**
   * https://developer.apple.com/documentation/dispatch/os_dispatch_object?language=objc
   */
  type OS_dispatch_semaphore = Foundation.NSObject<OS_dispatch_semaphore>

  type dispatch_semaphore_t = Foundation.NSObject<OS_dispatch_semaphore>

  /**
   * An abstract representation of time.
   * https://developer.apple.com/documentation/dispatch/dispatch_time_t?language=objc
   */
  type dispatch_time_t = number
}
