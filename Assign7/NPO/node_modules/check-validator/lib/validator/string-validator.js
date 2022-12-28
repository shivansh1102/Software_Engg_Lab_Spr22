'use strict';

/**
 * @ngdoc function
 * @name isRequired
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isRequired = (value, message, errors) => {
    if (!value || value.length <= 0)
        errors.push({ message: message })
};
/**
 * @ngdoc function
 * @name hasMinLen
 * @kind function
 *
 * @description
 * Check if value is less than the parameter min informed
 *
 * @param {*} value Reference to check.
 * @param {*} min Minimum quantity.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.hasMinLen = (value, min, message, errors) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}
/**
 * @ngdoc function
 * @name hasMaxLen
 * @kind function
 *
 * @description
 * Check if value is bigger than the parameter max informed
 *
 * @param {*} value Reference to check.
 * @param {*} max Maximum amount.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.hasMaxLen = (value, max, message, errors) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}
/**
 * @ngdoc function
 * @name isFixedLen
 * @kind function
 *
 * @description
 * Check if value is different than the parameter len informed
 *
 * @param {*} value Reference to check.
 * @param {*} len Length.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isFixedLen = (value, len, message, errors) => {
    if (value.length != len)
        errors.push({ message: message });
}
/**
 * @ngdoc function
 * @name isString
 * @kind function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isString = (value, message, errors) => {
    if (typeof value !== 'string')
        errors.push({ message: message })
};