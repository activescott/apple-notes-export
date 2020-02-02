

/**
 * In ObjC, nil is a valid message target. Sending a message to a nil object returns nil again. This behavior is different in JavaScript, which does not allow methods to be called on undefined.
 * To create a JavaScript object that represents nil, call the $() function with no arguments.
 */
interface Nil {
}