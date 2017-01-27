var argle = require('../');
var should = require('should');
var isFunction = require('lodash.isfunction');

var func = function () { };

test('argument shifting with ...args syntax', function () {
  function myFunction(opts, ...argList) {
    return argle.shift(argList, opts, isFunction);
  }

  var res1 = myFunction({ count: 3 }, func);
  var res2 = myFunction({ count: 3 }, 1, func);
  var res3 = myFunction({ count: 3 }, 1, 2, func);

  should(res1).deepEqual([ undefined, undefined, func ]);
  should(res2).deepEqual([ undefined, 1, func ]);
  should(res3).deepEqual([ 1, 2, func ]);

  var res4 = myFunction({ count: 3, defaults: [ 3, 4 ] }, func);
  var res5 = myFunction({ count: 3, defaults: [ 3, 4 ] }, 1, func);
  var res6 = myFunction({ count: 3, defaults: [ 3, 4 ] }, 1, 2, func);

  should(res4).deepEqual([ 3, 4, func ]);
  should(res5).deepEqual([ 4, 1, func ]);
  should(res6).deepEqual([ 1, 2, func ]);
});
