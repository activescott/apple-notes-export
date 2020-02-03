/**
 * Information about an error condition including a domain, a domain-specific error code, and application-specific information.
 * https://developer.apple.com/documentation/foundation/nserror?language=objc
 */
declare class NSError extends NSObject<NSError> {
  public code: number
  public localizedDescription: string
}
