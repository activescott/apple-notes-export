/**
 * https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW54
 */
declare class Automation {
  /**
   * The Automation object has a getDisplayString method that allows you to pass in an object and print it as source text or a human-readable display string.
   * Passing in true as the second parameter to getDisplayString will print the object as a display string instead of source text.
   */
  getDisplayString(object: any, asDisplayString?: boolean): string
}

declare class Application {
  static currentApplication(): any
  [name: string]: any
}

/**
 * Allows accessing a macOS Application.
 * @param app The name, bundle ID, path, process ID, or remote machine eppc reference.
 */
declare function Application(app: string): Application

//TODO: Library

/**
 * When you need to interact with files, such as a document in TextEdit, you will need a path object, not just a string with a path in it. You can use the Path constructor to instantiate paths.
 * Note: Get the string value of the Path by calling the toString method.
 * @example
 * TextEdit = Application('TextEdit')
 * path = Path('/Users/username/Desktop/foo.rtf')
 * TextEdit.open(path)
 */
declare interface Path {
  toString(): string
}

declare function Path(str: string): Path

//TODO: Progress
//TODO: ObjectSpecifier
//TODO: delay

declare interface Console {
  log(message?: any, ...optionalParams: any[]): void
}

declare const Console: {
  prototype: Console
  new (): Console
}

declare const console: Console