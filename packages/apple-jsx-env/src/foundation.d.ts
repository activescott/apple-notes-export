/**
 * Represents the types in macOS Foundation framework.
 * See https://developer.apple.com/documentation/foundation
 */
declare namespace Foundation {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * Defines the members of the NSObject class/type
   * https://developer.apple.com/documentation/objectivec/nsobject
   */
  interface NSObject<T extends NSObject<T>, TJSType = any>
    extends BridgedObject<TJSType> {
    /**
     * Returns a new instance of the receiving class.
     */
    alloc: T
    /**
     * Implemented by subclasses to initialize a new object (the receiver) immediately after memory for it has been allocated.
     */
    init: T
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  interface NSString extends NSObject<NSString, string> {
    /**
     * Instance property.
     * A new string made by expanding the initial component of the receiver to its full path value.
     * See https://developer.apple.com/documentation/foundation/nsstring/1407716-stringbyexpandingtildeinpath?language=objc
     * @example
     *
     */
    stringByExpandingTildeInPath: BridgedObject<string>

    initWithUTF8String(str: string): NSString
    /**
     * initWithData
     */
    initWithDataEncoding(data: NSData, encoding: NSStringEncoding): NSString

    /**
     * Writes the contents of the receiver to a file at a given path.
     * https://developer.apple.com/documentation/foundation/nsstring/1407654-writetofile?language=objc
     */
    writeToFileAtomicallyEncodingError(
      path: string,
      atomically: boolean,
      enc: NSStringEncoding,
      error: RefObject<NSError>
    ): boolean
  }

  /**
   * These values represent the various character encodings supported by the NSString classes.
   * See https://developer.apple.com/documentation/foundation/nsstringencoding?language=objc
   *
   * NOTE: In the JSX environment access these from the global `$` such as `$.NSUTF8StringEncoding`.
   */
  export type NSStringEncoding = number

  /**
   * A static ordered collection of objects.
   * https://developer.apple.com/documentation/foundation/nsarray?language=objc
   */
  type NSArray<ObjectType> = NSObject<NSArray<ObjectType>>

  type NSData = NSObject<NSData>

  interface NSDictionary<KeyType, ObjectType>
    extends NSObject<NSDictionary<KeyType, ObjectType>> {
    count: BridgedObject<number>
  }

  /**
   * Information about an error condition including a domain, a domain-specific error code, and application-specific information.
   * https://developer.apple.com/documentation/foundation/nserror?language=objc
   */
  interface NSError extends NSObject<NSError> {
    code: number
    localizedDescription: string
  }

  /**
   * An object-oriented wrapper for a file descriptor.
   * https://developer.apple.com/documentation/foundation/nsfilehandle?language=objc
   */
  interface NSFileHandle extends NSObject<NSFileHandle> {
    fileHandleForWritingAtPath(path: string): NSFileHandle
  }

  /**
   * A convenient interface to the contents of the file system, and the primary means of interacting with it.
   * https://developer.apple.com/documentation/foundation/nsfilemanager?language=objc
   */
  interface NSFileManager extends NSObject<NSFileManager> {
    /**
     * The shared file manager object for the process.
     */
    defaultManager: NSFileManager

    /**
     * Creates a directory with given attributes at the specified path.
     * https://developer.apple.com/documentation/foundation/nsfilemanager/1407884-createdirectoryatpath?language=objc
     * @param path A path string identifying the directory to create. You may specify a full path or a path that is relative to the current working directory. This parameter must not be nil.
     * @param createIntermediates     If YES, this method creates any non-existent parent directories as part of creating the directory in path. If NO, this method fails if any of the intermediate parent directories does not exist. This method also fails if any of the intermediate path elements corresponds to a file and not a directory.
     * @param attributes
     * @param error
     */
    createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
      path: string,
      createIntermediates: boolean,
      attributes: RefObject<NSDictionary<NSFileAttributeKey, id>> | Nil,
      error: RefObject<NSError> | Nil
    ): boolean

    /**
     * Returns a Boolean value that indicates whether a file or directory exists at a specified path.
     * https://developer.apple.com/documentation/foundation/nsfilemanager/1415645-fileexistsatpath?language=objc
     */
    fileExistsAtPath(path: string): boolean

    /**
     * Creates a file with the specified content and attributes at the given location.
     * https://developer.apple.com/documentation/foundation/nsfilemanager/1410695-createfileatpath?language=objc
     */
    createFileAtPathContentsAttributes(
      path: string,
      contents: NSData | Nil,
      attributes: NSDictionary<NSFileAttributeKey, id> | Nil
    ): boolean

    /**
     * Moves the file or directory at the specified path to a new location synchronously.
     * https://developer.apple.com/documentation/foundation/nsfilemanager/1413529-moveitematpath?language=objc
     */
    moveItemAtPathToPathError(
      srcPath: NSString,
      dstPath: NSString,
      refError: RefObject<NSError>
    ): boolean

    /**
     * Returns the contents of the file at the specified path.
     * https://developer.apple.com/documentation/foundation/filemanager/1407347-contents
     * @param path The path of the file whose contents you want.
     */
    contentsAtPath(path: NSString): NSData
  }

  type NSFileAttributeKey = string

  /**
   * https://developer.apple.com/documentation/foundation/nsprocessinfo?language=objc
   */
  interface NSProcessInfo extends NSObject<NSProcessInfo> {
    /**
     * Returns the process information agent for the process.
     * https://developer.apple.com/documentation/foundation/nsprocessinfo/1408734-processinfo?language=objc
     */
    processInfo: NSProcessInfo

    /**
     * Array of strings with the command-line arguments for the process.
     */
    arguments: BridgedObject<Array<string>>

    /**
     * The variable names (keys) and their values in the environment from which the process was launched.
     * https://developer.apple.com/documentation/foundation/processinfo/1417911-environment
     */
    environment: BridgedObject<Record<string, string>>
  }

  /**
   * An object representing a subprocess of the current process.
   * https://developer.apple.com/documentation/foundation/nstask?language=objc
   */
  interface NSTask extends NSObject<NSTask> {
    launchPath: BridgedObject<string>
    arguments: BridgedObject<Array<string>>
    standardInput: NSFileHandle
    standardOutput: NSFileHandle
    standardError: NSFileHandle
    /**
     * Launches the task represented by the receiver.
     * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
     */
    launch: void
    /**
     * Block until the receiver is finished.
     * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
     */
    waitUntilExit: void
    /**
     * Returns the exit status returned by the receiver’s executable.
     */
    terminationStatus: BridgedObject<number>
  }

  /**
   * A thread of execution.
   * https://developer.apple.com/documentation/foundation/nsthread?language=objc
   */
  interface NSThread extends NSObject<NSThread> {
    /**
     *
     * @param ti A number of seconds.
     */
    sleepForTimeInterval(ti: NSTimeInterval): void
  }

  type NSTimeInterval = number
}
