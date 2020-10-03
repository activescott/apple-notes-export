/**
 * Creates and launches a task with a specified executable and arguments. Then waits for it to complete
 * @param {string} executable A path to the executable to run
 * @param {Array<string>} args An array of arguments
 * @param {(NSFileHandle|NSPipe)} stdin standard input for the receiver
 * @param {(NSFileHandle|NSPipe)} stdout standard output for the receiver
 */
export function launchTask(
  executable: string,
  args: string[],
  stdin: Foundation.NSFileHandle,
  stdout: Foundation.NSFileHandle
): void {
  // launch it:
  const task = $.NSTask.alloc.init
  task.launchPath = ObjC.wrap(executable)
  task.arguments = ObjC.wrap(args)
  if (stdin) task.standardOutput = stdin
  if (stdout) task.standardOutput = stdout
  // NOTE: weird ObjC crap: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name. This example instantiates an empty mutable string." - https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW20
  task.launch
  // wait for it: https://developer.apple.com/documentation/foundation/nstask/1415808-waituntilexit?language=objc
  task.waitUntilExit

  // if it failed, throw
  const status = ObjC.unwrap(task.terminationStatus)

  if (status !== 0) {
    throw new Error(
      `Process ${executable} ${
        args ? args.join(" ") : ""
      } failed with exist status '${status}'.`
    )
  }
}
