export class Tools {
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static writeTextToFile(text, filePath) {
    // For instantiating and calling ObjC/$ types see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW20
    const str = $.NSString.alloc.initWithUTF8String(text)
    str.writeToFileAtomically(filePath, true)
    console.log(`Wote text to file '${filePath}'`)
  }

  static first(iterable) {
    for (let v of iterable) {
      return v
    }
  }
}
