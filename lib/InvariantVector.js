/*
Plane-invariant vector. A Vector can be represented in different
coordinate systems. The InvariantVector frees the user from
thinking the coordinate system of the vector.

*/
var nudged = require('nudged')

var InvariantVector = function (vec, plane) {
  // Example
  //   var p = taaspace.GlobalVector(vec, plane);
  //
  // Parameter
  //   vec
  //     a Vector, two-dimensional vector
  //   plane (optional, defaults to Space)
  //     a SpacePlane
  //       an item in space, enabling coord projections.
  //
  // Design note:
  //   fn (vec, plane) in this order to differentiate from SpaceNodes.
  //   The first argument of SpaceNodes is the parent.
  //
  if (typeof plane === 'undefined') {
    this._vec = vec
  } else {
    this._vec = vec.transform(plane.getGlobalTransform().toSpace())
  }

  // Design note: at first, the references were SpacePlanes and not
  // transformations. But because a SpacePlane can move or be removed,
  // we chose only the transformation to be remembered.
  // Design note: later we found it would be convenient for debugging
  // to know where the point came from, which led to this._origin.
  // After that we found that in toSpace method, we would need reference
  // to space, although we only have implicit reference to its coords.
  // Therefore this._origin was dropped.

  // Design note: was previously SpacePoint but it felt wrong to
  // require users to know the plane the SpacePoint was in. The initial
  // reason for SpacePoint was to get rid of that knowledge requirement.
  // InvariantVector is a Point without a plane. Internally the coordinates
  // are represented on the space plane for now.
}

var proto = InvariantVector.prototype

proto.equals = function (ivec) {
  // Return true if invariant vectors match.
  return (this._vec.equals(ivec._vec))
}

proto.add = function (ivec) {
  // Create a new vector by adding this to ivec.
  //
  // Parameters
  //   ivec
  //     an InvariantVector, displacement vector
  //
  // Return
  //   an InvariantVector
  //
  return new InvariantVector(this._vec.add(ivec._vec))
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
  //   an InvariantVector
  //
  var dv = new Vector(dx, dy)
  var spacev = dv.transform(plane.getGlobalTransform().toSpace())
  return new InvariantVector(this._vec.add(spacev))
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
  //   an InvariantVector
  //
  var dx = radius * Math.cos(radians)
  var dy = radius * Math.sin(radians)
  var dv = new Vector(dx, dy)
  var spacev = dv.transform(plane.getGlobalTransform().toSpace())
  return new InvariantVector(this._vec.add(spacev))
}

proto.to = function (plane) {
  // Represent the vector on the target coordinate plane.
  //
  // Parameters
  //   plane: a SpacePlane
  //
  // Return
  //   a Vector
  //
  if (plane === null || plane.isRoot()) {
    return this._vec
  }

  // Transformation from space to the target plane
  var tr = plane.getGlobalTransform().toSpace().inverse()
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
  //     an InvariantTransform
  //
  // Return
  //   an InvariantVector
  return new InvariantVector(this._vec.transform(itr.toSpace()))
}

module.exports = InvariantVector
