ObjC.import("sys/file")

export function writeTextToFile(text: string, filePath: string): void {
  const str = $.NSString.alloc.initWithUTF8String(text)
  const enc = $.NSUTF8StringEncoding
  const err = Ref<NSError>()

  const success = str.writeToFileAtomicallyEncodingError(
    filePath,
    true,
    enc,
    err
  )
  if (!success) {
    const desc =
      err[0] && err[0].localizedDescription ? err[0].localizedDescription : ""
    throw new Error("writeToFileAtomicallyEncodingError error:" + desc)
  }
}

export function fileExistsAtPath(atPath: string): boolean {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager
  return $.NSFileManager.defaultManager.fileExistsAtPath(atPath)
}

export function resolveRelativePath(relativePath: string): string {
  // stringByExpandingTildeInPath expands tilde: (if it has no leading tilde its unchanged)
  const expanded = $.NSString.alloc.initWithUTF8String(relativePath)
    .stringByExpandingTildeInPath

  // using OSA's JS Path object will resolve paths relative to the current working directory:
  return Path(expanded.js).toString()
}

export function createDir(path): void {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager/1407884-createdirectoryatpath?language=objc
  const createIntermediates = true
  // for info on nil: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
  const nilAttributes = $()
  const nilError = $()
  const success = $.NSFileManager.defaultManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
    path,
    createIntermediates,
    nilAttributes,
    nilError
  )
  if (!success)
    throw new Error(
      "createDirectoryAtPathWithIntermediateDirectoriesAttributesError failed"
    )
}

/**
 * Creates a file at the given location.
 * If a file already exists at path, this method overwrites the contents of that file if the current process has the appropriate privileges to do so.
 */
export function createFileAtPath(path): void {
  const nilContents = $()
  const nilAttributes = $()
  $.NSFileManager.defaultManager.createFileAtPathContentsAttributes(
    path,
    nilContents,
    nilAttributes
  )
}

export function moveItem(srcPath, dstPath): void {
  // for details on how to handle Ref: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW28
  const refError = Ref<NSError>()
  $.NSFileManager.defaultManager.moveItemAtPathToPathError(
    srcPath,
    dstPath,
    refError
  )
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
