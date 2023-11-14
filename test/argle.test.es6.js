const argle = require('../');
const should = require('should');
const isFunction = require('lodash.isfunction');

function func() { }

test('argument shifting with ...args syntax', function () {
    function myFunction(opts, ...argList) {
        return argle.shift(argList, opts, isFunction);
    }

    let res1 = myFunction({ count: 3 }, func);
    let res2 = myFunction({ count: 3 }, 1, func);
    let res3 = myFunction({ count: 3 }, 1, 2, func);

    should(res1).deepEqual([ undefined, undefined, func ]);
    should(res2).deepEqual([ undefined, 1, func ]);
    should(res3).deepEqual([ 1, 2, func ]);

    let res4 = myFunction({ count: 3, defaults: [ 3, 4 ] }, func);
    let res5 = myFunction({ count: 3, defaults: [ 3, 4 ] }, 1, func);
    let res6 = myFunction({ count: 3, defaults: [ 3, 4 ] }, 1, 2, func);

    should(res4).deepEqual([ 3, 4, func ]);
    should(res5).deepEqual([ 4, 1, func ]);
    should(res6).deepEqual([ 1, 2, func ]);
});
