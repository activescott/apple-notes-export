function processInfo() {
  return $.NSProcessInfo.processInfo
}
export function args() {
  // https://developer.apple.com/documentation/foundation/processinfo/1415596-arguments
  const pi = processInfo()
  return ObjC.deepUnwrap(pi.arguments)
}
