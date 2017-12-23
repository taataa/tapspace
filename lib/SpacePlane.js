//
// SpacePlane
//
// A SpacePlane represents a coordinate system. It does not include
// methods to transform the system. SpacePlane and SpaceTransformer are
// separated because we want to have planes that cannot be transformed,
// like the Space.
//
var InvariantTransform = require('./InvariantTransform')
var InvariantVector = require('./InvariantVector')
var Vector = require('./Vector')
var SpaceNode = require('./SpaceNode')
var Transform = require('./Transform')
var extend = require('extend')

var SpacePlane = function () {
  // A coordinate plane in space
  //
  SpaceNode.call(this)

  // Coordinate transformation.
  // The transformation from the plane to the parent (space).
  // See 2016-03-05-09
  //
  // Let:
  //   x_space, a point in space
  //   x_plane, a point on the plane.
  //   T, the coordinate transformation of the plane
  // Then:
  //   x_space = T * x_plane
  //
  // For Space, it is obviously the identity transform:
  //   x_space = T * x_space
  this._T = Transform.IDENTITY // identity transformation
}

var p = extend({}, SpaceNode.prototype)
SpacePlane.prototype = p

p.at = function (x, y) {
  // Get a InvariantVector at the (x, y) on the plane. Alternatively,
  // takes in a Vector.
  //
  // Parameters
  //   x
  //     Number
  //   y
  //     Number
  // OR
  //   vec
  //     Vector
  //
  // Return
  //   InvariantVector
  //
  if (typeof x === 'object' && typeof y === 'undefined') {
    return new InvariantVector(x, this)
  }

  if (typeof x !== 'number' && typeof y !== 'number') {
    // DEBUG TODO remove the check
    throw new Error('Invalid vector, use taaspace.Vector')
  }

  return new InvariantVector(new Vector(x, y), this)
}

p.getLocalTransform = function () {
  // Local coordinate transform from plane to parent,
  // returned as InvariantTransform as if parent is space.
  //
  // Return
  //   InvariantTransform
  //
  // Note:
  //   returns transformation from plane to parent, i.e.
  //     xy_parent = T * xy_plane
  //
  // Design decision about the transform reference plane
  //   The returned InvariantTransform contains the Transform from the plane
  //   to its parent without any regard on the global effect of the transform.
  //   For example
  //   a local translation of 10 screen pixels
  //   on a 100x upscaled plane
  //   yields an InvariantTransform that translates 0.1 screen pixels
  //   on the Space plane.
  //   An alternative option was that the effect stays same.
  //   E.g. the InvariantTransform still translates 10 screen pixels
  //   on the Space plane. This option was then implemented by
  //   getGlobalLocalTransform.
  //
  // This method is needed for example if we want to store
  // space transformer's local position for later use. In the following
  // example, a SpacePixel is moved at the same position with another.
  //   let px, py be SpacePixel instances
  //     that have been moved differently but have same parent.
  //   var lt = px.getLocalTransform()
  //   py.setLocalTransform(lt)
  //   Now px and py are positioned similarly.
  //
  // Old notes from v3:
  //   An alternative would have been to graft to the parent's coords:
  //     return new SpaceTransform(this._parent, this._T);
  //   This is kind of equivalent because:
  //     this_T_on_plane = this_T * this_T * inv(this_T) = this_T
  //   However, it is more natural if getLocalTransform is represented on
  //   the local coord system.
  //
  return new InvariantTransform(this._T)
}

p.getGlobalLocalTransform = function () {
  // Get the local transformation from the plane to the parent
  // so that its global effect is captured. For example,
  // if the local translation is a translation of 10 units,
  // and the parent is a 100x scaled plane, then
  // the effect of the translation is 1000 units on the space.
  // This method preserves this effect unlike getLocalTransform
  // that preserves only the local effect.
  //
  if (this._parent === null) {
    return InvariantTransform.IDENTITY
  }
  return new InvariantTransform(this._T, this._parent)
}

p.getGlobalTransform = function () {
  // Get a transformation from the plane to the space as InvariantTransform.
  //
  // Return:
  //   SpaceTransform
  //     Transformation from the plane to root.
  //     Represented on the root.
  //
  // Dev note:
  //   Local transformations go like:
  //     xy_parent = T_plane * xy_plane
  //     xy_parent_parent = T_parent * xy_parent
  //     ...
  //     xy_root = T_parent_parent..._parent * xy_parent_parent..._parent
  //   Therefore global transformation is:
  //     xy_root = T_parent_..._parent * ... * T_parent * T_plane * xy_plane
  var T, plane

  if (this._parent === null) {
    // This is root, thus identity
    return InvariantTransform.IDENTITY
  }
  // else this is a descendant of a Space

  T = this._T
  plane = this._parent

  // As long as the plane is not root
  while (plane._parent !== null) {
    T = plane._T.multiplyBy(T)
    plane = plane._parent
  }

  // plane._parent === null, hence plane is the root.
  return new InvariantTransform(T)
}

module.exports = SpacePlane
