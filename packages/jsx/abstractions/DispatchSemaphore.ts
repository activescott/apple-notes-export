/* eslint-disable @typescript-eslint/camelcase */
ObjC.import("dispatch")

/**
 * An object that controls access to a resource across multiple execution contexts through use of a traditional counting semaphore.
 * https://developer.apple.com/documentation/dispatch/dispatch_semaphore?language=objc
 */
export class DispatchSemaphore {
  private sema: dispatch_semaphore_t

  public constructor(value: number) {
    this.sema = $.dispatch_semaphore_create(value)
  }

  /**
   * Blocks until the specified promise completes.
   * NOTE: OSA doesn't wait on outstanding promises, so the process ends before then/catch are called and no errors are reported to stdout!
   */
  public static waitOnPromise<T>(promise: Promise<T>): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const log = (message?: any, ...optionalParams: any[]): void => null //console.log("[waitOnPromise] " + message, optionalParams)
    let finalResult: T = undefined
    let finalReason = undefined

    const sema = new DispatchSemaphore(0)

    promise
      .then(result => {
        finalResult = result
        log("then result:", result)
        sema.signal()
      })
      .catch(reason => {
        finalReason = reason
        log("catch error:", reason)
        sema.signal()
      })
    log("waiting...")
    while (sema.waitForever() != 0) {
      log("sleeping...")
      $.NSThread.sleepForTimeInterval(1)
      log("sleeping done!")
    }
    if (finalReason) {
      throw finalReason
    } else {
      return finalResult
    }
  }

  /**
   * Waits for (decrements) a semaphore.
   * @param timeout
   */
  public wait(timeout: number): void {
    return $.dispatch_semaphore_wait(this.sema, timeout)
  }

  public waitForever(): number {
    return $.dispatch_semaphore_wait(this.sema, $.DISPATCH_TIME_FOREVER)
  }

  public signal(): number {
    return $.dispatch_semaphore_signal(this.sema)
  }
}
