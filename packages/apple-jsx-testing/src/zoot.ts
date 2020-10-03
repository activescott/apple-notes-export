let INDENT_COUNT = 0
const indent = (): number => INDENT_COUNT++
const outdent = (): number => INDENT_COUNT--
const indentCount = (): number => INDENT_COUNT

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function testLog(message?: any, ...optionalParams: any[]): void {
  // eslint-disable-next-line no-console
  console.log(" ".repeat(indentCount()) + message, optionalParams)
}

export function describe(suite: string, suiteHandler: () => void): void {
  testLog(`🎬 running suite ${suite}`)
  indent()
  try {
    suiteHandler()
  } finally {
    outdent()
  }
}

export const test: TestFunction = (
  testName: string,
  testHandler: () => void
): void => {
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

test.todo = (testName: string) => testLog(`⚠️ ${testName} needs written!`)

interface TestFunction {
  todo: (testName: string) => void
  (testName: string, testHandler: () => void)
}
