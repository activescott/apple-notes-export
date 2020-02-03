export function args() {
  // https://developer.apple.com/documentation/foundation/processinfo/1415596-arguments
  const pi = $.NSProcessInfo.processInfo
  return ObjC.deepUnwrap(pi.arguments)
}
