/**
 * Namespace to represent the Dispatch framework in Objective-C/macOS.
 * See https://developer.apple.com/documentation/dispatch
 */
declare namespace Dispatch {
  /* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/class-name-casing */
  /**
   * https://developer.apple.com/documentation/dispatch/os_dispatch_object?language=objc
   */
  interface OS_dispatch_semaphore
    extends Foundation.NSObject<OS_dispatch_semaphore> {}

  interface dispatch_semaphore_t
    extends Foundation.NSObject<OS_dispatch_semaphore> {}

  /**
   * An abstract representation of time.
   * https://developer.apple.com/documentation/dispatch/dispatch_time_t?language=objc
   */
  type dispatch_time_t = number
}
