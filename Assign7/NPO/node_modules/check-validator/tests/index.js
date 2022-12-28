let CheckValidator = require('../lib/index');
var assert = require('assert');

describe('Check Validator', function () {
    let validator;
    describe('function hasMinLen', function () {
        it('Value can not be less than 4 characters', function () {
            validator = new CheckValidator();
            validator.hasMinLen('tes', 4, 'Value can not be less than 4 characters');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function hasMaxLen', function () {
        it('Value can not be longer than 5 characters', function () {
            validator = new CheckValidator();
            validator.hasMaxLen('test case', 5, 'Value can not be longer than 4 characters');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isFixedLen', function () {
        it('Number of different characters', function () {
            validator = new CheckValidator();
            validator.isFixedLen('test', 3, 'Number of different characters');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isEmail', function () {
        it('Invalid email', function () {
            validator = new CheckValidator();
            validator.isEmail('test&email.com', 'Invalid email');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isRequired', function () {
        it('Not reported', function () {
            validator = new CheckValidator();
            validator.isRequired('', 'Not reported');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });

    describe('function isUndefined', function () {
        it('Is undefined', function () {
            validator = new CheckValidator();
            let value;
            validator.isUndefined(value, 'is undefined');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });

    describe('function isDate', function () {
        it("t's not a date", function () {
            validator = new CheckValidator();
            let value = {};
            validator.isDate(value, "t's not a date");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });

    describe('function isArray', function () {
        it("t's not a array", function () {
            validator = new CheckValidator();
            let value = {};
            validator.isArray(value, "t's not a array");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isString', function () {
        it("t's not a string", function () {
            validator = new CheckValidator();
            validator.isString(100, "t's not a string");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isNumber', function () {
        it("t's not a number", function () {
            validator = new CheckValidator();
            validator.isNumber('test', "t's not a number");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isGreaterThan', function () {
        it("is greater than", function () {
            validator = new CheckValidator();
            validator.isGreaterThan(10, 20, "is greater than");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isGreaterOrEqualsThan', function () {
        it("is greater or equals than", function () {
            validator = new CheckValidator();
            validator.isGreaterOrEqualsThan(5, 15, "is greater or equals than");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isLowerThan', function () {
        it("is greater or equals than", function () {
            validator = new CheckValidator();
            validator.isLowerThan(99, 1, "is lower than");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isLowerOrEqualsThan', function () {
        it("is lower or equals than", function () {
            validator = new CheckValidator();
            validator.isLowerOrEqualsThan(99, 1, "is lower or equals than");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function areEquals', function () {
        it("are equals", function () {
            validator = new CheckValidator();
            validator.areEquals(1, 2, "are equals");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function areNotEquals', function () {
        it("are not equals", function () {
            validator = new CheckValidator();
            validator.areNotEquals(1, 1, "are not equals");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isBetween', function () {
        it("is between", function () {
            validator = new CheckValidator();
            validator.isBetween(10, 9, 8, "is between");
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });
    describe('function isRequired and isEmail', function () {
        it('Not reported and inalid email', function () {
            validator = new CheckValidator();
            validator.isRequired('', 'Not reported');
            validator.isEmail('email$email.com', 'Invalid email');
            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }
        });
    });

    describe('test examples', function () {
        it('All test examples', function () {
            let validator = new CheckValidator();

            //examples: hasMinLen, hasMaxLen, isEmail
            validator.hasMinLen('Hulk', 5, 'Value cannot be less than 5 characters');
            validator.hasMaxLen('Avengers infinity war', 6, 'Value can not be longer than 6 characters');
            validator.isEmail('thanos.com', 'Invalid email');

            if (!validator.isValid()) {
                assert.ok(true);
            } else {
                assert.ok(false);
            }

            //erros
            console.log(validator.errors());
        });
    });

});