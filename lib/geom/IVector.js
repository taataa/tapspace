//
// Plane-Invariant Vector. A Vector can be represented in different
// coordinate systems. The IVector frees the user from
// thinking the coordinate system of the vector.
//
var Vector = require('./Vector')
var IScalar = require('./IScalar')

var IVector = function (vec, plane) {
  // Example
  //   var p = new tapspace.IVector(vec, plane)
  //
  // Parameter
  //   vec
  //     a Vector, two-dimensional vector
  //   plane (optional, defaults to Space)
  //     a AbstractPlane
  //       an item in space, enabling coord projections.
  //
  // Design note:
  //   fn (vec, plane) in this order to differentiate from AbstractNodes.
  //   The first argument of AbstractNodes is the parent.
  //
  if (typeof vec === 'undefined') {
    throw new Error('a Vector is required')
  }

  if (typeof plane === 'undefined') {
    this._vec = vec
  } else {
    this._vec = vec.transform(plane.getGlobalTransform())
  }

  // Design note: at first, the references were AbstractPlanes and not
  // transformations. But because a AbstractPlane can move or be removed,
  // we chose only the transformation to be remembered.
  // Design note: later we found it would be convenient for debugging
  // to know where the point came from, which led to this._origin.
  // After that we found that in toSpace method, we would need reference
  // to space, although we only have implicit reference to its coords.
  // Therefore this._origin was dropped.

  // Design note: was previously SpacePoint but it felt wrong to
  // require users to know the plane the SpacePoint was in. The initial
  // reason for SpacePoint was to get rid of that knowledge requirement.
  // IVector is a Point without a plane. Internally the coordinates
  // are represented on the space plane for now.
}

var proto = IVector.prototype

proto.add = function (ivec) {
  // Create a new IVector by adding this to ivec.
  //
  // Parameters
  //   ivec
  //     an IVector, displacement vector
  //
  // Return
  //   an IVector
  //
  return new IVector(this._vec.add(ivec._vec))
}

proto.almostEqual = function (ivec) {
  return this._vec.almostEqual(ivec._vec)
}

proto.distance = function (ivec) {
  // Return distance between two IVectors i.e.
  // norm of their difference as IScalar.
  return new IScalar(this._vec.distance(ivec._vec))
}

proto.equal =
proto.equals = function (ivec) {
  // Return true if invariant vectors match.
  return this._vec.equals(ivec._vec)
}

proto.multiply = function (scalar) {
  return new IVector(this._vec.multiply(scalar))
}

proto.norm = function () {
  // Return
  //   an IScalar
  return new IScalar(this._vec.norm())
}

proto.offset = function (dx, dy, plane) {
  // Create a new vector displaced by dx and dy.
  //
  // Parameters
  //   dx
  //   dy
  //   plane
  //     an optional plane of dx and dy. Default to space.
  //
  // Return
  //   an IVector
  //
  var dv, spacev
  dv = new Vector(dx, dy)

  if (plane) {
    spacev = dv.transform(plane.getGlobalTransform())
  } else {
    spacev = dv
  }

  return new IVector(this._vec.add(spacev))
}

proto.polarOffset = function (radius, radians, plane) {
  // Create a new point moved by the polar coordinates
  //
  // Parameters:
  //   radius
  //     distance from vector
  //   radians
  //     rotation angle
  //   plane
  //     optional plane of the offset.
  //     The global rotation of the plane affects the angle.
  //     The global scale of the plane affects the radius.
  //
  // Return
  //   an IVector
  //
  var dx, dy, dv, spacev

  dx = radius * Math.cos(radians)
  dy = radius * Math.sin(radians)
  dv = new Vector(dx, dy)

  if (plane) {
    spacev = dv.transform(plane.getGlobalTransform())
  } else {
    spacev = dv
  }

  return new IVector(this._vec.add(spacev))
}

proto.to = function (plane) {
  // Represent the vector on the target coordinate plane.
  //
  // Parameters
  //   plane: a AbstractPlane
  //
  // Return
  //   a Vector
  //
  if (plane === null || plane.isRoot()) {
    return this._vec
  }

  // Transformation from space to the target plane
  var tr = plane.getGlobalTransform().inverse()
  return this._vec.transform(tr)
}

proto.toSpace = function () {
  // Represent the vector on the space coordinate plane.
  //
  // Return
  //   a Vector.
  //
  return this._vec
}

proto.transform = function (itr) {
  // Create a new vector by transforming this by invariant transformation.
  //
  // Parameters
  //   itr
  //     an ITransform
  //
  // Return
  //   an IVector
  return new IVector(this._vec.transform(itr.toSpace()))
}

module.exports = IVector
