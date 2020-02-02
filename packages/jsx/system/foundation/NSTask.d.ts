/**
 * An object representing a subprocess of the current process.
 * https://developer.apple.com/documentation/foundation/nstask?language=objc
 */
declare class NSTask extends NSObject<NSTask> {
  launchPath: BridgedObject<string>
  arguments: BridgedObject<Array<string>>
  standardInput: NSFileHandle
  standardOutput: NSFileHandle
  /**
   * Launches the task represented by the receiver.
   * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
   */
  launch: void
  /**
   * Block until the receiver is finished.
   * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
   */
  waitUntilExit: void
  /**
   * Returns the exit status returned by the receiver’s executable.
   */
  terminationStatus: BridgedObject<number>
}
