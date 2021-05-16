var IScalar = require('./IScalar')

var ISize = function (size, plane) {
  // Parameters:
  //   size
  //     a Size
  //   plane
  //     defines the coordinate system. Optional, default to root.
  //
  if (typeof size === 'undefined') {
    throw new Error('Missing Size parameter')
  }

  if (typeof plane === 'undefined') {
    this._size = size
  } else {
    this._size = size.transform(plane.getGlobalTransform())
  }
}

var proto = ISize.prototype

proto.almostEqual = function (isize) {
  return this._size.equal(isize._size)
}

proto.equal = function (isize) {
  return this._size.equal(isize._size)
}

proto.getHeight = function () {
  return new IScalar(this._size.height)
}

proto.getWidth = function () {
  return new IScalar(this._size.width)
}

proto.to = function (plane) {
  // Represent the size on the target coordinate plane.
  //
  // Parameters
  //   plane: an AbstractPlane
  //
  // Return
  //   a Size
  //
  if (plane === null || plane.isRoot()) {
    return this._size
  }

  // Transformation from space to the target plane
  var tr = plane.getGlobalTransform().inverse()
  return this._size.transform(tr)
}

proto.toSpace = function () {
  // Represent the size on the space coordinate plane.
  //
  // Return
  //   a Size.
  //
  return this._size
}

module.exports = ISize
