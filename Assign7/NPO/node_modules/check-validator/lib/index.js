'use strict';

//imports
var validator = require('./validator/validator');
var emailValidator = require('./validator/email-validator');
var stringValidator = require('./validator/string-validator');
var numberValidator = require('./validator/number-validator');

let errors = [];

function CheckValidator() {
    errors = [];
}

CheckValidator.prototype.isRequired = (value, message) => {
    stringValidator.isRequired(value, message, errors);
}

CheckValidator.prototype.isString = (value, message) => {
    stringValidator.isString(value, message, errors);
}

CheckValidator.prototype.hasMinLen = (value, min, message) => {
    stringValidator.hasMinLen(value, min, message, errors);
}

CheckValidator.prototype.hasMaxLen = (value, max, message) => {
    stringValidator.hasMaxLen(value, max, message, errors);
}

CheckValidator.prototype.isFixedLen = (value, len, message) => {
    stringValidator.isFixedLen(value, len, message, errors);
}

CheckValidator.prototype.isEmail = (value, message) => {
    emailValidator.isEmail(value, message, errors);
}

CheckValidator.prototype.isUndefined = (value, message) => {
    validator.isUndefined(value, message, errors);
}

CheckValidator.prototype.isDate = (value, message) => {
    validator.isDate(value, message, errors);
}

CheckValidator.prototype.isArray = (value, message) => {
    validator.isArray(value, message, errors);
}

CheckValidator.prototype.isNumber = (value, message) => {
    numberValidator.isNumber(value, message, errors);
}

CheckValidator.prototype.isGreaterThan = (value, comparer, message) => {
    numberValidator.isGreaterThan(value, comparer, message, errors);
}

CheckValidator.prototype.isGreaterOrEqualsThan = (value, comparer, message) => {
    numberValidator.isGreaterOrEqualsThan(value, comparer, message, errors);
}

CheckValidator.prototype.isLowerThan = (value, comparer, message) => {
    numberValidator.isLowerThan(value, comparer, message, errors);
}

CheckValidator.prototype.isLowerOrEqualsThan = (value, comparer, message) => {
    numberValidator.isLowerOrEqualsThan(value, comparer, message, errors);
}

CheckValidator.prototype.areEquals = (value, comparer, message) => {
    numberValidator.areEquals(value, comparer, message, errors);
}

CheckValidator.prototype.areNotEquals = (value, comparer, message) => {
    numberValidator.areNotEquals(value, comparer, message, errors);
}

CheckValidator.prototype.isBetween = (value, from, to, message) => {
    numberValidator.isBetween(value, from, to, message, errors);
}

CheckValidator.prototype.errors = () => {
    return errors;
}

CheckValidator.prototype.addErros = (value) => {
    errors.push(value);
}

CheckValidator.prototype.clear = () => {
    errors = [];
}

CheckValidator.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = CheckValidator;