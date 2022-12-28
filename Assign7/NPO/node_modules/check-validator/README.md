# check-validator
Check validation for node.js

[![build status][travis-image]][travis-url]

Check validator that enables validation on multiple parameters at once.

## Instalation and usage

### Instalation

```
npm i check-validator
```

### Basic usage

```
let CheckValidator = require('check-validator');
let validator =  new CheckValidator();

//examples: hasMinLen, hasMaxLen, isEmail
validator.hasMinLen('Hulk', 5, 'Value cannot be less than 5 characters');
validator.hasMaxLen('Avengers infinity war', 6, 'Value can not be longer than 6 characters');
validator.isEmail('thanos.com', 'Invalid email');

if (!validator.isValid()) {
	console.log('Validation errors');
} else {
	console.log('There were no validation errors');
}

//erros
console.log(validator.errors());
```
## Simple validation

Validation without chaining.

## Validations

List of available validations.

### String

- **hasMinLen(value, text)** (value, min, message) - Check if value is less than the parameter min informed
- **hasMaxLen(value, max, message)** - Check if value is bigger than the parameter max informed
- **isFixedLen(value, len, message)** - Check if value is different than the parameter len informed
- **isRequired(value, message)** - Check if value is required
- **isString(value, message)** - Determines if a reference is a `String`.

### Email

- **isEmail(value, message)** - Check valid email

### Number

- **isNumber(value, message)** - Determines if a reference is a Number.
- **isGreaterThan(value, comparer, message)** - Is greater than.
- **isGreaterOrEqualsThan(value, comparer, message)** - Is greater or equals than.
- **isLowerThan(value, comparer, message)** - Is lower than.
- **isLowerOrEqualsThan(value, comparer, message)** - Is lower or equals than.
- **areEquals(value, comparer, message)** - Are equals.
- **areNotEquals(value, comparer, message)** - Are not equals.
- **isBetween(value, from, to, message)** - Is between.

### Other

- **isUndefined(value, message)** - Determines if a reference is undefined.
- **isDate(value, message)** - Determines if a value is a date.
- **isArray(value, message)** - Determines if a reference is an Array. Alias of Array.isArray.


## Props and Methods

| Method/Prop | Desc | Test | Status | async |
|---|---|---|---|---|
| errors | Return a list of errors | OK | Ready | NO |
| clear () | Clear the error list | OK | Ready | NO |
| isValid () | verify the validity | OK | Ready | NO |
| isRequired (val, message) |  | OK | Ready | NO |
| isString (val, message) |  | OK | Ready | NO |
| hasMinLen (val, min, message) |   | OK | Ready  | NO |
| hasMaxLen (val, max, message) |   | OK | Ready | NO |
| isFixedLen (val, len, message) |   | OK | Ready  | NO |
| isEmail (email, message) |   | OK |  Ready | NO |
| isUndefined (value, message |   | OK |  Ready | NO |
| isDate (value, message) |   | OK |  Ready | NO |
| isArray (value, message) |   | OK |  Ready | NO |
| isNumber (value, message) |   | OK |  Ready | NO |
| isGreaterThan (value, comparer, message) |   | OK |  Ready | NO |
| isGreaterOrEqualsThan (value, comparer, message) |   | OK |  Ready | NO |
| isLowerThan (value, comparer, message) |   | OK |  Ready | NO |
| isLowerOrEqualsThan (value, comparer, message) |   | OK |  Ready | NO |
| areEquals (value, comparer, message) |   | OK |  Ready | NO |
| areNotEquals (value, comparer, message) |   | OK |  Ready | NO |
| isBetween (value, from, to, message) |   | OK |  Ready | NO |

[npm-image]: https://img.shields.io/npm/v/password-validator.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/check-validator
[travis-image]:https://img.shields.io/travis/tarunbatra/password-validator.svg?style=flat-square
[travis-url]:https://travis-ci.org/tarunbatra/check-validator