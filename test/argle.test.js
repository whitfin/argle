var argle = require('../');
var should = require('should');
var isFunction = require('lodash.isfunction');

var func = function () { };

test('argument shifting', function () {
  var base1 = [ 1, 2, func ];
  var base2 = [ 1, func ];
  var base3 = [ func ];
  var base4 = [ func, 3, 4 ];
  var base5 = [ func, undefined ];
  var base6 = [ 1, func, undefined ];

  var res1 = argle.shift(base1, isFunction);
  var res2 = argle.shift(base2, isFunction);
  var res3 = argle.shift(base3, isFunction);
  var res4 = argle.shift(base4, isFunction);
  var res5 = argle.shift(base5, isFunction);
  var res6 = argle.shift(base6, isFunction);

  should(res1).deepEqual([ 1, 2, func ]);
  should(res2).deepEqual([ 1, func ]);
  should(res3).deepEqual([ func ]);
  should(res4).deepEqual([ func, 3, 4 ]);
  should(res5).deepEqual([ undefined, func ]);
  should(res6).deepEqual([ 1, undefined, func ]);
});

test('argument shifting with defaults', function () {
  var base1 = [ func, undefined ];
  var base2 = [ 1, func, undefined ];
  var base3 = [ undefined, 2, func, undefined ];

  var res1 = argle.shift(base1, [ 'test' ],  isFunction);
  var res2 = argle.shift(base2, [ 1, 2, 3 ], isFunction);
  var res3 = argle.shift(base3, [ 1, 2, 3 ], isFunction);

  should(res1).deepEqual([ 'test', func ]);
  should(res2).deepEqual([ 1, 3, func ]);
  should(res3).deepEqual([ undefined, 2, 3, func ]);
});
