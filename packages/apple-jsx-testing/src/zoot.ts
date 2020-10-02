let INDENT_COUNT = 0
const indent = () => INDENT_COUNT++
const outdent = () => INDENT_COUNT--
const indentCount = () => INDENT_COUNT

function testLog(message?: any, ...optionalParams: any[]): void {
  console.log(" ".repeat(indentCount()) + message, optionalParams)
}

export function describe(suite: string, suiteHandler: () => void) {
  testLog(`🎬 running suite ${suite}`)
  indent()
  try {
    suiteHandler()
  } finally {
    outdent()
  }
}

export function test(testName: string, testHandler: () => void) {
  testLog(`🎬 running test ${testName}...`)
  indent()
  try {
    testHandler()
    testLog(`✅`)
  } catch (err) {
    testLog(`❌: ${err}`)
    return
  } finally {
    outdent()
  }
}

