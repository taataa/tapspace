
exports.extend = function (target, source) {
  // Shallow object extend.
  // Return a new object where keys and values of the source
  // are merged with or replaced by target's keys and values.
  //
  var k
  var obj = {}
  for (k in target) {
    if (target.hasOwnProperty(k)) {
      obj[k] = target[k]
    }
  }
  for (k in source) {
    if (source.hasOwnProperty(k)) {
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
