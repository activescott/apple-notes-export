
/**
 * A convenient interface to the contents of the file system, and the primary means of interacting with it.
 * https://developer.apple.com/documentation/foundation/nsfilemanager?language=objc
 */
declare class NSFileManager extends NSObject<NSFileManager> {
  /**
   * The shared file manager object for the process.
   */
  defaultManager: NSFileManager

  /**
   * Creates a directory with given attributes at the specified path.
   * https://developer.apple.com/documentation/foundation/nsfilemanager/1407884-createdirectoryatpath?language=objc
   * @param path A path string identifying the directory to create. You may specify a full path or a path that is relative to the current working directory. This parameter must not be nil.
   * @param createIntermediates     If YES, this method creates any non-existent parent directories as part of creating the directory in path. If NO, this method fails if any of the intermediate parent directories does not exist. This method also fails if any of the intermediate path elements corresponds to a file and not a directory.
   * @param nilAttributes
   * @param nilError
   */
  createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
    path: string,
    createIntermediates: boolean,
    nilAttributes: NSDictionary<NSFileAttributeKey, id> | Nil,
    nilError: NSError | Nil
  )

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
  ): BridgedObject<boolean>

  /**
   * Moves the file or directory at the specified path to a new location synchronously.
   * https://developer.apple.com/documentation/foundation/nsfilemanager/1413529-moveitematpath?language=objc
   */
  moveItemAtPathToPathError(srcPath: NSString, dstPath: NSString, refError: RefObject<NSError>): BridgedObject<boolean>
}

type NSFileAttributeKey = string
