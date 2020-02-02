
## Organization
This root package dir is organized as follows:

* `/bridge`: The JavaScript for Automation (JSX) bridge API that allows connecting to Open Scripting Architecture (OSA) environment or the underlying System/OS/Cocoa/Objective-C APIs.
* `/system`: The native Objective-C/Cocoa APIs that are part of the core macOS system.
  * `/<framework>`: Each subdirectory in the `/system` directory should be the name of a framework in the `/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/<FRAMEWORK_NAME>.framework/Headers/<HEADER_NAME>.h` directories in macOS SDK. Within each of those framework directories there are header files that contains the native underlying types that would be re-declared in the files in this package.


## References
- [JavaScript for Automation Release Notes](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_ref/doc/uid/TP40014508-CH111-SW1) is the official reference for JavaScript for Automation (JSX) which is the component that provides the JavaScript language in the Open Scripting Architecture (OSA) environment (of which the other notable language is AppleScript).
- [Open Scripting Architecture (OSA)](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/osa.html#//apple_ref/doc/uid/TP40001571) is the official reference for the Open Scripting Architecture built into macOS.
- [Foundation Framework in Apple Developer Documention](https://developer.apple.com/documentation/foundation?language=objc) is the Foundation Framework which provides access to the "essential data types, collections, and operating-system services to define the base layer of functionality for your app" for any macOS application.

