exports.extend = function (target, source) {
  // Shallow object extend.
  // Return a new object where keys and values of the source
  // are merged with or replaced by target's keys and values.
  //
  var k
  var obj = {}
  for (k in target) {
    if (Object.prototype.hasOwnProperty.call(target, k)) {
      obj[k] = target[k]
    }
  }
  for (k in source) {
    if (Object.prototype.hasOwnProperty.call(source, k)) {
      obj[k] = source[k]
    }
  }
  return obj
}

exports.convertToTransformationType = function (opts) {
  // Converts transformation mode object to transformation type string.
  //
  // Parameters:
  //   opts: alternative properties
  //
  var t = opts.translate && !opts.pivot
  var s = opts.scale
  var r = opts.rotate

  if (t || s || r) {
    return (t ? 'T' : '') + (s ? 'S' : '') + (r ? 'R' : '')
  } // else
  return 'I'
}

exports.clone = function (obj) {
  // Shallow object copy
  var k
  var res = {}

  for (k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      res[k] = obj[k]
    }
  }

  return res
}

exports.cardinality = function (obj) {
  // Number of own properties
  var k
  var res = 0

  for (k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      res += 1
    }
  }

  return res
}
