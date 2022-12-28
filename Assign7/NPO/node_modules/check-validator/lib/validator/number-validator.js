/**
 * @ngdoc function
 * @name isNumber
 * @kind function
 *
 * @description
 * Determines if a reference is a `Number`.
 *
 * @param {*} value Reference to check.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isNumber = (value, message, errors) => {
    if (typeof value !== 'number') {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name isGreaterThan
 * @kind function
 *
 * @description
 * Determine is greater than
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isGreaterThan = (value, comparer, message, errors) => {
    if (value <= comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name isGreaterOrEqualsThan
 * @kind function
 *
 * @description
 * Determine is greater or equals than
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isGreaterOrEqualsThan = (value, comparer, message, errors) => {
    if (value < comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name isLowerThan
 * @kind function
 *
 * @description
 * Determine is lower than
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isLowerThan = (value, comparer, message, errors) => {
    if (value >= comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name isLowerOrEqualsThan
 * @kind function
 *
 * @description
 * Determine is lower or equals than
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isLowerOrEqualsThan = (value, comparer, message, errors) => {
    if (value > comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name areEquals
 * @kind function
 *
 * @description
 * Are equals
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.areEquals = (value, comparer, message, errors) => {
    if (value != comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name areNotEquals
 * @kind function
 *
 * @description
 * Are not equals
 *
 * @param {*} value Reference to check.
 * @param {*} comparer comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.areNotEquals = (value, comparer, message, errors) => {
    if (value == comparer) {
        errors.push({
            message: message
        });
    }
};
/**
 * @ngdoc function
 * @name isBetween
 * @kind function
 *
 * @description
 * Is between
 *
 * @param {*} value Reference to check.
 * @param {*} from comparison value.
 * @param {*} to comparison value.
 * @param {*} message Validation message.
 * @param {*} errors Errors.
 */
exports.isBetween = (value, from, to, message, errors) => {
    if (!(value > from && value < to)) {
        errors.push({
            message: message
        });
    }
};