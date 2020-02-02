ObjC.import("sys/file")

export function writeTextToFile(text: string, filePath: string): void {
  // For instantiating and calling ObjC/$ types see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW20
  const str = $.NSString.alloc.initWithUTF8String(text)
  str.writeToFileAtomically(filePath, true)
}

export function fileExistsAtPath(atPath: string): boolean {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager
  return $.NSFileManager.defaultManager.fileExistsAtPath(atPath)
}

export function resolveRelativePath(relativePath: string): string {
  // using OSA's JS Path object:
  return Path(relativePath).toString()
}

export function createDir(path) {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager/1407884-createdirectoryatpath?language=objc
  const createIntermediates = true
  // for info on nil: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
  const nilAttributes = $()
  const nilError = $()
  $.NSFileManager.defaultManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
    path,
    createIntermediates,
    nilAttributes,
    nilError
  )
}

/** 
 * Creates a file at the given location.
 * If a file already exists at path, this method overwrites the contents of that file if the current process has the appropriate privileges to do so.
*/
export function createFileAtPath(path) {
  // for info on nil: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
  const nilContents = $()
  const nilAttributes = $()
  $.NSFileManager.defaultManager.createFileAtPathContentsAttributes(path, nilContents, nilAttributes)
}

export function moveItem(srcPath, dstPath) {
  // for details on how to handle Ref: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW28
  const refError = Ref<NSError>()
  $.NSFileManager.defaultManager.moveItemAtPathToPathError(srcPath, dstPath, refError)
  if (refError[0]) {
    throw new Error("Error calling moveItemAtPathToPathError:" + refError[0])
  }
}
/**
 * Returns a file handle initialized for writing to the file, device, or named socket at the specified path.
 * nil if no file exists at path.
 * @param {string} path Path to file.
 */
export function fileHandleForWritingAtPath(path): NSFileHandle {
  // see https://developer.apple.com/documentation/foundation/nsfilehandle/1414405-filehandleforwritingatpath?language=objc
  return $.NSFileHandle.fileHandleForWritingAtPath(path)
}
