/**
 * An object representing a subprocess of the current process.
 * https://developer.apple.com/documentation/foundation/nstask?language=objc
 */
declare class NSTask extends NSObject<NSTask> {
  public launchPath: BridgedObject<string>
  public arguments: BridgedObject<Array<string>>
  public standardInput: NSFileHandle
  public standardOutput: NSFileHandle
  /**
   * Launches the task represented by the receiver.
   * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
   */
  public launch: void
  /**
   * Block until the receiver is finished.
   * NOTE: This is a method, but the JXA bridge is crazy: "If the ObjC method does not take arguments, then you invoke it by accessing the JavaScript property with that name."
   */
  public waitUntilExit: void
  /**
   * Returns the exit status returned by the receiver’s executable.
   */
  public terminationStatus: BridgedObject<number>
}
