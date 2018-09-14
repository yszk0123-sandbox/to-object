const { isPlainObject, isFunction, sortBy } = require('lodash');

function isNest(o) {
  return o != null && !Array.isArray(o)  && typeof o === 'object' && !isPlainObject(o);
}

function getDescriptorEntries(instance) {
  const entries = Object.entries(Object.getOwnPropertyDescriptors(instance));
  const proto = Object.getPrototypeOf(instance);
  const parentEntries = proto ? getDescriptorEntries(proto) : [];
  return [...parentEntries, ...entries];
}

exports.toObject = function toObject(input) {
  const normalKeys = Object.keys(input);
  const getterKeys = isPlainObject(input) ? [] :
    getDescriptorEntries(Object.getPrototypeOf(input))
      .filter(([key, descriptor]) => key !== '__proto__' && typeof descriptor.get === 'function')
      .map(([key]) => key);

  const output = {};
  [...normalKeys, ...getterKeys].forEach(key => {
    const value = input[key];
    output[key] = isNest(value) ? toObject(value) : value;
  });

  return output;
}
