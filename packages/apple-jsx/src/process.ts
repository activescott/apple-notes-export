export function args(): string[] {
  // https://developer.apple.com/documentation/foundation/processinfo/1415596-arguments
  const pi = $.NSProcessInfo.processInfo
  return ObjC.deepUnwrap(pi.arguments)
}

export function env(): Record<string, string> {
  const pi = $.NSProcessInfo.processInfo
  return ObjC.deepUnwrap(pi.environment)
}
