declare class ObjC {
  /**
   *  symbols from the Foundation framework are available by default in JavaScript for Automation. You can make additional frameworks and libraries available using the ObjC.import() method. For example, to use the NSBeep() function, which is not present in Foundation, you can import the Cocoa framework.
   * @param {string} framework
   */
  static import(framework: string): void

  /**
   * The ObjC.unwrap() method can be used to convert a wrapped ObjC object into a primitive JavaScript data type.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   * @param objc An ObjectiveC object.
   */
  static unwrap<TJSType>(objc: BridgedObject<TJSType>): TJSType

  /**
   * The ObjC.deepUnwrap() method can be used to recursively convert a wrapped ObjC object into a primitive JavaScript data type.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   * @param objc An ObjectiveC object.
   */

  static deepUnwrap<TJSType>(objc: BridgedObject<TJSType>): TJSType

  /**
   * The ObjC.wrap() method can be used convert a primitive JavaScript data type into an ObjC object type, and then wrap that ObjC object in a JavaScript wrapper.
   * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW22
   */
  static wrap<TJSType>(obj: TJSType): BridgedObject<TJSType>
}
