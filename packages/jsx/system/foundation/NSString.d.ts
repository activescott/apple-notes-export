declare class NSString extends NSObject<NSString> {
  initWithUTF8String(str: string): NSString
  /**
   * Writes the contents of the receiver to a file at a given path.
   * https://developer.apple.com/documentation/foundation/nsstring/1407654-writetofile?language=objc
   */
  writeToFileAtomically(path: string, atomically: boolean): boolean
}
