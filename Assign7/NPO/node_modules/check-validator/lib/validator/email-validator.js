'use strict';

/**
 * @ngdoc function
 * @name isEmail
 * @kind function
 *
 * @description
 * Check valid email.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isEmail = (value, message, errors) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}