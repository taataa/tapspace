//
// Plane-Invariant Scalar
//
var IScalar = function (scalar, plane) {
  // Example
  //   var p = new tapspace.IScalar(scalar, plane);
  //
  // Parameter
  //   scalar
  //     a Number, a single real number
  //   plane (optional, defaults to Space)
  //     a AbstractPlane
  //       an item in space, enabling coord projections.
  //
  if (typeof scalar !== 'number') {
    throw new Error('a valid number is required')
  }

  if (typeof plane === 'undefined') {
    this._num = scalar
  } else {
    this._num = scalar * plane.getGlobalTransform().getScale()
  }
}

var proto = IScalar.prototype

proto.add = function (isca) {
  // Create a new IScalar by adding this to isca.
  //
  // Parameters
  //   isca
  //     an IScalar
  //
  // Return
  //   an IScalar
  //
  return new IScalar(this._num + isca._num)
}

proto.equal =
proto.equals = function (isca) {
  // Return true if invariant scalars match.
  return this._num === isca._num
}

proto.to = function (plane) {
  // Represent the scalar on the target coordinate plane.
  //
  // Parameters
  //   plane: a AbstractPlane
  //
  // Return
  //   a Number
  //
  if (plane === null || plane.isRoot()) {
    return this._num
  }

  // Transformation from space to the target plane
  var s = plane.getGlobalTransform().inverse().getScale()
  return this._num * s
}

proto.toSpace = function () {
  // Represent the scalar on the space coordinate plane.
  //
  // Return
  //   a Number
  //
  return this._num
}

module.exports = IScalar
