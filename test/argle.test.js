var argle = require('../');
var should = require('should');
var isFunction = require('lodash.isfunction');

function one() { }
function two() { }
function three() { }

test('argument shifting', function () {
  var base1 = [ 1, 2, one ];
  var base2 = [ 1, one ];
  var base3 = [ one ];
  var base4 = [ one, 3, 4 ];
  var base5 = [ one, undefined ];
  var base6 = [ 1, one, undefined ];

  var res1 = argle.shift(base1, isFunction);
  var res2 = argle.shift(base2, isFunction);
  var res3 = argle.shift(base3, isFunction);
  var res4 = argle.shift(base4, isFunction);
  var res5 = argle.shift(base5, isFunction);
  var res6 = argle.shift(base6, isFunction);

  should(res1).deepEqual([ 1, 2, one ]);
  should(res2).deepEqual([ 1, one ]);
  should(res3).deepEqual([ one ]);
  should(res4).deepEqual([ one, 3, 4 ]);
  should(res5).deepEqual([ undefined, one ]);
  should(res6).deepEqual([ 1, undefined, one ]);
});

test('argument shifting with defaults', function () {
  var base1 = [ one, undefined ];
  var base2 = [ 1, one, undefined ];
  var base3 = [ undefined, 2, one, undefined ];

  var res1 = argle.shift(base1, [ 'test' ],  isFunction);
  var res2 = argle.shift(base2, [ 1, 2, 3 ], isFunction);
  var res3 = argle.shift(base3, [ 1, 2, 3 ], isFunction);

  should(res1).deepEqual([ 'test', one ]);
  should(res2).deepEqual([ 1, 3, one ]);
  should(res3).deepEqual([ undefined, 2, 3, one ]);
});

test('argument shifting with offsets', function () {
  function myFunction(opts, option1, option2, function1, function2, function3) {
    return argle.shift([ option1, option2, function1, function2, function3 ], opts, isFunction);
  }

  var res1 = myFunction({ match: 2 }, one, two, three);
  var res2 = myFunction({ match: 2 }, 1, one, two, three);
  var res3 = myFunction({ match: 2 }, 1, 2, one, two, three);

  should(res1).deepEqual([ one, undefined, undefined, two, three ]);
  should(res2).deepEqual([ 1, one, undefined, two, three ]);
  should(res3).deepEqual([ 1, 2, one, two, three ]);

  var res4 = myFunction({ match: 3 }, one, two, three);
  var res5 = myFunction({ match: 3 }, 1, one, two, three);
  var res6 = myFunction({ match: 3 }, 1, 2, one, two, three);

  should(res4).deepEqual([ undefined, undefined, one, two, three ]);
  should(res5).deepEqual([ 1, undefined, one, two, three ]);
  should(res6).deepEqual([ 1, 2, one, two, three ]);

  var res7 = myFunction({ match: 3, defaults: [ {} ] }, one, two, three);
  var res8 = myFunction({ match: 3, defaults: [ {} ] }, 1, one, two, three);
  var res9 = myFunction({ match: 3, defaults: [ {} ] }, 1, 2, one, two, three);

  should(res7).deepEqual([ undefined, {}, one, two, three ]);
  should(res8).deepEqual([ 1, {}, one, two, three ]);
  should(res9).deepEqual([ 1, 2, one, two, three ]);
});
