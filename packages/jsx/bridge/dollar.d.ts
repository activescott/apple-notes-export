// https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
declare namespace $ {
  const NSString: NSString
  const NSFileManager: NSFileManager
  const NSProcessInfo: NSProcessInfo
  const NSTask: NSTask
  const NSFileHandle: NSFileHandle
  const NSThread: NSThread

  /**
   * Creates new counting semaphore with an initial value.
   * https://developer.apple.com/documentation/dispatch/1452955-dispatch_semaphore_create?language=objc
   * @param value The starting value for the semaphore. Do not pass a value less than zero.
   */
  function dispatch_semaphore_create(value: number): dispatch_semaphore_t

  /**
   * Signals (increments) a semaphore.
   * https://developer.apple.com/documentation/dispatch/1452919-dispatch_semaphore_signal?language=objc
   */
  function dispatch_semaphore_signal(dsema: dispatch_semaphore_t): number

  /**
   * Waits for (decrements) a semaphore.
   * https://developer.apple.com/documentation/dispatch/1453087-dispatch_semaphore_wait?language=objc
   */
  function dispatch_semaphore_wait(
    dsema: dispatch_semaphore_t,
    timeout: dispatch_time_t
  )

  /**
   * Indicates a time that means infinity.
   * https://developer.apple.com/documentation/dispatch/dispatch_time_forever?language=objc
   */
  const DISPATCH_TIME_FOREVER: number
}

/**
 * See "Implicit Pass-by-Reference" at https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW27
 */
declare function $<T>(): RefObject<T>
