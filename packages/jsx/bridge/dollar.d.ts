/* eslint-disable @typescript-eslint/camelcase */
// https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
declare namespace $ {
  const NSString: NSString
  const NSFileManager: NSFileManager
  const NSProcessInfo: NSProcessInfo
  const NSTask: NSTask
  const NSFileHandle: NSFileHandle
  const NSThread: NSThread

  // NSStringEncoding from NSString.h
  const NSASCIIStringEncoding: NSStringEncoding /* 0..127 only */
  const NSNEXTSTEPStringEncoding: NSStringEncoding
  const NSJapaneseEUCStringEncoding: NSStringEncoding
  const NSUTF8StringEncoding: NSStringEncoding
  const NSISOLatin1StringEncoding: NSStringEncoding
  const NSSymbolStringEncoding: NSStringEncoding
  const NSNonLossyASCIIStringEncoding: NSStringEncoding
  const NSShiftJISStringEncoding: NSStringEncoding /* kCFStringEncodingDOSJapanese */
  const NSISOLatin2StringEncoding: NSStringEncoding
  const NSUnicodeStringEncoding: NSStringEncoding
  const NSWindowsCP1251StringEncoding: NSStringEncoding /* Cyrillic; same as AdobeStandardCyrillic */
  const NSWindowsCP1252StringEncoding: NSStringEncoding /* WinLatin1 */
  const NSWindowsCP1253StringEncoding: NSStringEncoding /* Greek */
  const NSWindowsCP1254StringEncoding: NSStringEncoding /* Turkish */
  const NSWindowsCP1250StringEncoding: NSStringEncoding /* WinLatin2 */
  const NSISO2022JPStringEncoding: NSStringEncoding /* ISO 2022 Japanese encoding for e-mail */
  const NSMacOSRomanStringEncoding: NSStringEncoding
  const NSUTF16StringEncoding: NSStringEncoding /* An alias for NSUnicodeStringEncoding */
  const NSUTF16BigEndianStringEncoding: NSStringEncoding /* NSUTF16StringEncoding encoding with explicit endianness specified */
  const NSUTF16LittleEndianStringEncoding: NSStringEncoding /* NSUTF16StringEncoding encoding with explicit endianness specified */
  const NSUTF32StringEncoding: NSStringEncoding
  const NSUTF32BigEndianStringEncoding: NSStringEncoding /* NSUTF32StringEncoding encoding with explicit endianness specified */
  const NSUTF32LittleEndianStringEncoding: NSStringEncoding /* NSUTF32StringEncoding encoding with explicit endianness specified */

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
 * For info on Nil see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
 */
declare function $<T>(): RefObject<T>
