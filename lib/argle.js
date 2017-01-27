var isArray = require('lodash.isarray');
var isFunction = require('lodash.isfunction');
var isNumber = require('lodash.isnumber');

/* Public */

function shift(stuff, options, detect) {
  if (isFunction(options)) {
    detect = options;
  }

  if (!options) {
    options = {};
  }

  var arr = stuff.concat();
  var def;

  if (isArray(options)) {
    def = options.concat();
  } else {
    def = options['defaults'] || [];
    if (isNumber(options.count)) {
      while (arr.length < options.count) {
        arr.unshift(def.pop());
      }
    }
  }

  var len = arr.length;
  var off = len - 1;

  for (var i = len; i >= 0; --i) {
    var ele = arr[i];
    if (detect(ele)) {
      arr[off--] = ele;
      while (off >= i) {
        arr[off--] = def.pop();
      }
      break;
    }
    if (!!ele) {
      break;
    }
  }

  return arr;
}

/* Exports */

module.exports.shift = shift;
