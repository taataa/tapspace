//
// Plane-invariant scalar
//
var InvariantScalar = function (scalar, plane) {
  // Example
  //   var p = new taaspace.InvariantScalar(scalar, plane);
  //
  // Parameter
  //   scalar
  //     a Number, a single real number
  //   plane (optional, defaults to Space)
  //     a SpacePlane
  //       an item in space, enabling coord projections.
  //
  if (typeof scalar !== 'number') {
    throw new Error('a valid number is required')
  }

  if (typeof plane === 'undefined') {
    this._num = scalar
  } else {
    this._num = scalar * plane.getGlobalTransform().toSpace().getScale()
  }
}

var proto = InvariantScalar.prototype

proto.add = function (isca) {
  // Create a new InvariantScalar by adding this to isca.
  //
  // Parameters
  //   isca
  //     an InvariantScalar
  //
  // Return
  //   an InvariantScalar
  //
  return new InvariantScalar(this._num + isca._num)
}

proto.equals = function (isca) {
  // Return true if invariant scalars match.
  return this._num === isca._num
}

proto.to = function (plane) {
  // Represent the scalar on the target coordinate plane.
  //
  // Parameters
  //   plane: a SpacePlane
  //
  // Return
  //   a Number
  //
  if (plane === null || plane.isRoot()) {
    return this._num
  }

  // Transformation from space to the target plane
  var s = plane.getGlobalTransform().toSpace().inverse().getScale()
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

module.exports = InvariantScalar
