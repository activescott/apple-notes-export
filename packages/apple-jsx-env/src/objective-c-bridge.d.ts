// This file contains all the types that are necessary for the Object-C Bridge layer in the JavaScript Open Scripting Architecture (OSA) environment as defined at https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
/**
 * A JavaScript wrapper for an ObjC object.
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
 */
declare interface BridgedObject<TJSType> {
  /**
   * The `.js` property of wrapped ObjC objects is a convenient alias for `ObjC.unwrap()`. For example, `$("foo").js` returns "foo".
   */
  js: TJSType
  /**
   * To determine if a bridged object is actually wrapping a nil pointer, you can call the isNil() method.
   */
  isNil(): boolean
  getProperty<T>(key: string): T
  setProperty<TPropType>(key: string, value: TPropType)
}

/**
 * The `$()` operator is a convenient alias for ObjC.wrap(), and is meant to be similar to the @() boxing operator in ObjC. For example, $("foo") returns a wrapped NSString instance, and $(1) returns a wrapped NSNumber instance.
 * See "Implicit Pass-by-Reference" at https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW27
 * For info on Nil see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
 */
declare function $<T>(): RefObject<T>

/**
 * JavaScript for Automation has a built-in Objective-C bridge that enables you to access the file system and build Cocoa applications.
 * The primary access points for the Objective-C bridge are the global properties ObjC and $.
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
 */
declare namespace $ {
  const NSString: Foundation.NSString
  const NSFileManager: Foundation.NSFileManager
  const NSProcessInfo: Foundation.NSProcessInfo
  const NSTask: Foundation.NSTask
  const NSFileHandle: Foundation.NSFileHandle
  const NSThread: Foundation.NSThread

  const NSTemporaryDirectory: () => Foundation.NSString

  /**
   * Creates new counting semaphore with an initial value.
   * https://developer.apple.com/documentation/dispatch/1452955-dispatch_semaphore_create?language=objc
   * @param value The starting value for the semaphore. Do not pass a value less than zero.
   */
  function dispatch_semaphore_create(
    value: number
  ): Dispatch.dispatch_semaphore_t

  /**
   * Signals (increments) a semaphore.
   * https://developer.apple.com/documentation/dispatch/1452919-dispatch_semaphore_signal?language=objc
   */
  function dispatch_semaphore_signal(
    dsema: Dispatch.dispatch_semaphore_t
  ): number

  /**
   * Waits for (decrements) a semaphore.
   * https://developer.apple.com/documentation/dispatch/1453087-dispatch_semaphore_wait?language=objc
   */
  function dispatch_semaphore_wait(
    dsema: Dispatch.dispatch_semaphore_t,
    timeout: Dispatch.dispatch_time_t
  )

  /**
   * Indicates a time that means infinity.
   * https://developer.apple.com/documentation/dispatch/dispatch_time_forever?language=objc
   */
  const DISPATCH_TIME_FOREVER: number

  const NSUTF8StringEncoding: Foundation.NSStringEncoding
  const NSASCIIStringEncoding: Foundation.NSStringEncoding
  const NSNEXTSTEPStringEncoding: Foundation.NSStringEncoding
  const NSJapaneseEUCStringEncoding: Foundation.NSStringEncoding
  const NSISOLatin1StringEncoding: Foundation.NSStringEncoding
  const NSSymbolStringEncoding: Foundation.NSStringEncoding
  const NSNonLossyASCIIStringEncoding: Foundation.NSStringEncoding
  const NSShiftJISStringEncoding: Foundation.NSStringEncoding
  const NSISOLatin2StringEncoding: Foundation.NSStringEncoding
}

declare const ObjC: ObjCType

declare interface ObjCType {
  /**
   *  symbols from the Foundation framework are available by default in JavaScript for Automation. You can make additional frameworks and libraries available using the ObjC.import() method. For example, to use the NSBeep() function, which is not present in Foundation, you can import the Cocoa framework.
   * @param {string} framework
   */
  import(framework: string): void

  /**
   * The ObjC.unwrap() method can be used to convert a wrapped ObjC object into a primitive JavaScript data type.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   * @param objc An ObjectiveC object.
   */
  unwrap<TJSType>(objc: BridgedObject<TJSType>): TJSType

  /**
   * The ObjC.deepUnwrap() method can be used to recursively convert a wrapped ObjC object into a primitive JavaScript data type.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   * @param objc An ObjectiveC object.
   */

  deepUnwrap<TJSType>(objc: BridgedObject<TJSType>): TJSType

  /**
   * The ObjC.wrap() method can be used convert a primitive JavaScript data type into an ObjC object type, and then wrap that ObjC object in a JavaScript wrapper.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   */
  wrap<TJSType>(obj: TJSType): BridgedObject<TJSType>
}

/**
 * In ObjC, nil is a valid message target. Sending a message to a nil object returns nil again. This behavior is different in JavaScript, which does not allow methods to be called on undefined.
 * To create a JavaScript object that represents nil, call the $() function with no arguments.
 * For info on Nil see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
 */
type Nil = RefObject<unknown>

/**
 * The Ref class can be used to pass arguments that ObjC expects to be passed by reference. The referenced value can be retrieved by accessing the 0 property of the Ref.
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW28
 */
declare interface RefObject<T> {
  readonly [n: number]: T
  equals<T = unknown>(a: RefObject<T>, b: RefObject<T>): boolean
}

declare function Ref<T>(): RefObject<T>
declare function Ref<T>(value: T): RefObject<T>

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * see https://developer.apple.com/documentation/objectivec/id & https://stackoverflow.com/questions/7987060/what-is-the-meaning-of-id
 */
declare type id = any
