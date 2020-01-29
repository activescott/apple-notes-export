ObjC.import("sys/file")
// for a lot of stuff in this file see https://developer.apple.com/documentation/foundation/filemanager

export function writeTextToFile(text, filePath) {
  // For instantiating and calling ObjC/$ types see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW20
  const str = $.NSString.alloc.initWithUTF8String(text)
  str.writeToFileAtomically(filePath, true)
  console.log(`Wrote text to file '${filePath}'`)
}

export function resolveRelativePath(relativePath) {
  // using AppleScript's JS Path object:
  return Path(relativePath).toString()
}

export function fileExists(atPath) {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager
  const fileMan = $.NSFileManager.defaultManager
  return fileMan.fileExistsAtPath(atPath)
}

export function createDir(path) {
  // see https://developer.apple.com/documentation/foundation/nsfilemanager/1407884-createdirectoryatpath?language=objc
  const fileMan = $.NSFileManager.defaultManager
  const createIntermediates = true
  // for info on nil: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
  let nilAttributes = $()
  let nilError = $()
  fileMan.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(
    path,
    createIntermediates,
    nilAttributes,
    nilError
  )
}

export function moveItem(srcPath, dstPath) {
  // https://developer.apple.com/documentation/foundation/nsfilemanager/1413529-moveitematpath?language=objc
  const fileMan = $.NSFileManager.defaultManager
  // for details on how to handle Ref: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW28
  const refError = Ref()
  fileMan.moveItemAtPathToPathError(srcPath, dstPath, refError)
  if (refError[0]) {
    throw new Error("Error calling moveItemAtPathToPathError:", refError[0])
  }
}
