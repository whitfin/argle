# Argle [![Build Status](https://travis-ci.org/zackehh/argle.svg?branch=master)](https://travis-ci.org/zackehh/argle)

Argle is a very small argument shifting library for JavaScript which makes it easy to accept optional parameters **before** the end of your arguments list. It works great against things like destructuring in ES6, but is still usable from within ES5 versions of JavaScript.

Consider this example:

```javascript
// Define a function which always has a callback, but two optional arguments
function myFunction(optionalArgument1, optionalArgument2, callbackFunction) {
  
}

// Typically you're stuck shifting these arguments manually:
function myFunction(optionalArgument1, optionalArgument2, callbackFunction) {
  if (isFunction(optionalArgument1)) {
    callbackFunction = optionalArgument1;
    optionalArgument2 = undefined;
    optionalArgument1 = undefined;
  }
  else if (isFunction(optionalArgument2)) {
    callbackFunction = optionalArgument2;
    optionalArgument2 = undefined;
  }
}

// Even in ES6, you can't use default arguments to assist with this.
// Calling myFunction(function () { }) would give you [ function () { }, { } ] as arguments.
function myFunction(optionalArgument1 = {}, optionalArgument2 = {}, callbackFunction) {
  // optionalArgument1 == function () { }
  // optionalArgument2 == { }
  // callbackFunction  == undefined;
}

// Argle aims to make this a little less awful (it's still gross though)
// In ES5, calling with: myFunction(function () { }):
function myFunction(optionalArgument1, optionalArgument2, callbackFunction) {
  var args1 = argle.shift([ optionalArgument1, optionalArgument2, callbackFunction ], isFunction);
  var args2 = argle.shift([ optionalArgument1, optionalArgument2, callbackFunction ], [ 1, 2 ], isFunction);
  var args3 = argle.shift([ optionalArgument1, optionalArgument2, callbackFunction ], [ {} ], isFunction);
  
  // args1 == [ undefined, undefined, function () { })
  // args2 == [ 1, 2, function () { })
  // args3 == [ undefined, {}, function () { })
}

// In ES6, calling with: myFunction(function () { }):
// Note that you should provide 'count' as an option to inform how many arguments you're wanting
function myFunction(...argList) {
  let optionalArgument1, optionalArgument2, callbackFunction, opts = {
    count: 3,
    defaults: [ {}, {} ]
  };
  
  [ optionalArgument1, optionalArgument2, callbackFunction ] = argle.shift(argList, opts, isFunction);
  // or [ optionalArgument1 = {}, optionalArgument2 = {}, callbackFunction ] = argle.shift(argList, { count: 3 }, isFunction);
}
```

### Installation

Argle lives on npm, so just install it via the command line and you're good to go. All other dependencies will be pulled automatically.

```
$ npm install --save argle
```

### Usage

The API is super simple, there's a single function `shift/3`:

``javascript
argle.shift(argumentsArray, [ optionalDefaultValues | optionalOptionsObject ], detectionFunction);

// argumentsArray           - your args list to shift (an array or arguments object)
// optionalDefaultValues    - a values list to shift with rather than 'undefined', this is the same as { defaults: optionalDefaultValues }
// optionalOptionsObject    - an object containing options
    // count                - the amount of arguments you desire (only useful with ...args syntax)
    // defaults             - a values list to shift with rather than 'undefined'
// detectionFunction        - a function which should return true when you've found your right-most argument
```

### Issues

If you spot any issues when using Argle, please file an [issue](https://github.com/zackehh/argle/issues).
