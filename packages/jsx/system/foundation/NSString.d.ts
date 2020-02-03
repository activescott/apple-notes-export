declare class NSString extends NSObject<NSString> {
  /**
   * Instance property.
   * A new string made by expanding the initial component of the receiver to its full path value.
   * See https://developer.apple.com/documentation/foundation/nsstring/1407716-stringbyexpandingtildeinpath?language=objc
   * @example
   *
   */
  public stringByExpandingTildeInPath: BridgedObject<string>

  public initWithUTF8String(str: string): NSString
  /**
   * Writes the contents of the receiver to a file at a given path.
   * https://developer.apple.com/documentation/foundation/nsstring/1407654-writetofile?language=objc
   */
  public writeToFileAtomicallyEncodingError(
    path: string,
    atomically: boolean,
    enc: NSStringEncoding,
    error: RefObject<NSError>
  ): boolean
}

/**
 * These values represent the various character encodings supported by the NSString classes.
 * See https://developer.apple.com/documentation/foundation/nsstringencoding?language=objc
 */
type NSStringEncoding = number
