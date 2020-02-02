
/**
 * The Ref class can be used to pass arguments that ObjC expects to be passed by reference. The referenced value can be retrieved by accessing the 0 property of the Ref.
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW28
 */
declare interface RefObject<T> {
  readonly [n: number]: T
  equals<T = unknown>(a: RefObject<T>, b: RefObject<T>): boolean
}

declare function Ref<T>(): RefObject<T>
declare function Ref<T>(value: any): RefObject<T>
