/**
 * In ObjC, nil is a valid message target. Sending a message to a nil object returns nil again. This behavior is different in JavaScript, which does not allow methods to be called on undefined.
 * To create a JavaScript object that represents nil, call the $() function with no arguments.
 * For info on Nil see https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW26
 */
type Nil = RefObject<unknown>
