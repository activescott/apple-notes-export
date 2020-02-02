/**
 * A JavaScript wrapper for an ObjC object.
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW17
 */
interface BridgedObject<TJSType> {
  /**
   * The .js property of wrapped ObjC objects is a convenient alias for ObjC.unwrap(). For example, $("foo").js returns "foo".
   */
  js: TJSType
  /**
   * To determine if a bridged object is actually wrapping a nil pointer, you can call the isNil() method.
   */
  isNil(): boolean
  getProperty(key: string): any
  setProperty<TPropType = any>(key: string, value: TPropType)
}
