/**
 * Creates a writable store for a string.
 *
 * @typedef {Object} WritableStringStore
 * @property {function(string):void} set - Sets the value of the store.
 * @property {function(function(string):string):void} update - Updates the value of the store based on a callback function.
 * @property {function(function(string):void):function():void} subscribe - Subscribes to changes in the store value.
 */

/**
 * @typedef {any} WritableObjectStore
 * @property {function(any):void} set - Sets the value of the store.
 * @property {function(function(any):any):void} update - Updates the value of the store based on a callback function.
 * @property {function(function(any):void):function():void} subscribe - Subscribes to changes in the store value.
 */
