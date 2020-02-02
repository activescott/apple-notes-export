
/**
 * An object-oriented wrapper for a file descriptor.
 * https://developer.apple.com/documentation/foundation/nsfilehandle?language=objc
 */
declare class NSFileHandle extends NSObject<NSFileHandle> {
  fileHandleForWritingAtPath(path: string): NSFileHandle
}
