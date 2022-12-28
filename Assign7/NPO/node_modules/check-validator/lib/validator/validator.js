'use strict';

/**
 * @ngdoc function
 * @name isUndefined
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isUndefined = (value, message, errors) => {
    if (typeof value === 'undefined' || value === null)
        errors.push({ message: message })
};

/**
 * @ngdoc function
 * @name isDate
 * @kind function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isDate = (value, message, errors) => {
    if (toString.call(value) !== '[object Date]')
        errors.push({ message: message })
};
/**
 * @ngdoc function
 * @name isArray
 * @kind function
 *
 * @description
 * Determines if a reference is an Array. Alias of Array.isArray.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isArray = (value, message, errors) => {
    if (!Array.isArray(value) && !(value instanceof Array))
        errors.push({ message: message })
};



