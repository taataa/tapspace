//
// Plane-Invariant Path. Immutable.
//
var IVector = require('./IVector')
var Path = require('./Path')

var IPath = function (p, plane) {
  // Example
  //   var ip = new tapspace.IPath(p, plane)
  //
  // Parameter
  //   p (optional, default to empty Path())
  //     a Path, a two-dimensional collection of Vectors
  //   plane (optional, defaults to Space)
  //     a AbstractPlane
  //       an item in space, enabling coord projections.
  //
  if (typeof p === 'undefined') {
    this._p = new Path()
  } else if (typeof plane === 'undefined') {
    this._p = p
  } else {
    this._p = p.transform(plane.getGlobalTransform())
  }

  this.length = this._p.length
}

var proto = IPath.prototype

proto.add = function (ip) {
  // Create a new IPath by concatenating this and ipa.
  //
  // Parameters
  //   ipa
  //     an IPath
  //
  // Return
  //   an IPath
  //
  return new IPath(this._p.add(ip._p))
}

proto.almostEqual = function (ipa) {
  return this._p.almostEqual(ipa._p)
}

proto.atMid = function () {
  return new IVector(this._p.atMid())
}

proto.bottom = function () {
  console.warn('IPath#bottom is a deprecated method.')
  return new IVector(this._p.bottom())
}

proto.equal =
proto.equals = function (ipa) {
  // Return true if paths match.
  return this._p.equals(ipa._p)
}

proto.first = function () {
  return new IVector(this._p.first())
}

proto.get = function (i) {
  return new IVector(this._p.get(i))
}

proto.getBounds = function () {
  console.warn('IPath#getBounds is a deprecated method.')
  return new IPath(this._p.getBounds())
}

proto.getHull = function () {
  // Return convex hull of the invariant path
  return new IPath(this._p.getHull())
}

proto.last = function () {
  return new IVector(this._p.last())
}

proto.left = function () {
  console.warn('IPath#left is a deprecated method.')
  return new IVector(this._p.left())
}

proto.right = function () {
  console.warn('IPath#right is a deprecated method.')
  return new IVector(this._p.right())
}

proto.to = function (plane) {
  // Represent the path on the target coordinate plane.
  //
  // Parameters
  //   plane: a AbstractPlane
  //
  // Return
  //   a Path
  //
  if (plane === null || plane.isRoot()) {
    return this._p
  }

  // Transformation from space to the target plane
  var tr = plane.getGlobalTransform().inverse()
  return this._p.transform(tr)
}

proto.toArray = function () {
  // Return array of IVectors
  return this._p.toArray().map(function (vec) {
    return new IVector(vec)
  })
}

proto.top = function () {
  console.warn('IPath#right is a deprecated method.')
  return new IVector(this._p.top())
}

proto.toSpace = function () {
  // Represent the path on the space coordinate plane.
  //
  // Return
  //   a Path.
  //
  return this._p
}

proto.transform = function (itr) {
  // Create a new IPath by transforming this
  // by invariant transformation.
  //
  // Parameters
  //   itr
  //     an ITransform
  //
  // Return
  //   an IPath
  return new IPath(this._p.transform(itr.toSpace()))
}

module.exports = IPath
