/*
Similarly as a point can be represented in multiple coordinate systems,
so can a transformation. To prevent users from figuring out how transformations
are converted to other representations, we have SpaceTransform.

The API is similar to SpacePoint. However, instead of offset methods, we have
a set of similarity transformation methods.
*/

var SpaceTransform = function (T, reference) {
  // Immutable i.e. new instances are returned.
  //
  // Example
  //   var t = taaspace.SpaceTransform(taaspace.Transform.IDENTITY, taa);
  //
  // Parameter
  //   T
  //     a taaspace.Transform
  //   reference
  //     a SpacePlane, SpacePoint, or SpaceTransform
  //       an item in space, enabling coord projections.

  // A transformation on the plane.
  this.T = T;

  // The coordinate transformation of the plane.
  if (reference.hasOwnProperty('getGlobalTransform')) {
    // Is a SpacePlane
    this._T = reference.getGlobalTransform();
  } else {
    // Is a SpacePoint or SpaceTransform
    this._T = reference._T;
  }
};

var proto = SpaceTransform.prototype;

proto.equals = function (st) {
  // Parameters:
  //   st: a SpaceTransform
  return (this.T.equals(st.T) && this._T.equals(st._T));
};

proto.to = function (target) {
  // Convert the transform onto the target coordinate plane.
  //
  // Parameters:
  //   target: a SpacePlane, SpacePoint, or SpaceTransform
  //
  // Return:
  //   new SpaceTransform
  var targetGT, this2target, tOnTarget;

  if (target === null) {
    // target is the root node (space)
    return this.toSpace();
  }

  // Target's global transformation. This._T is already global.
  if (target.hasOwnProperty('getGlobalTransform')) {
    targetGT = target.getGlobalTransform();
  } else {
    targetGT = target._T;
  }

  // Avoid unnecessary, probably rounding errors inducing computation.
  if (targetGT.equals(this._T)) {
    return this;
  } // else

  // The transformation on the target plane equals to:
  // 1) convert from target to current
  // 2) execute the transformation
  // 3) convert back to target.
  // Fortunately we can combine these steps into a one transformation matrix.
  // Let us first compute conversion from this to target and remember that:
  //   x_space = T_plane * x_plane
  this2target = targetGT.inverse().multiplyBy(this._T);
  tOnTarget = this2target.multiplyBy(this.T.multiplyBy(this2target.inverse()));
  return new SpaceTransform(tOnTarget, target);
};

proto.toSpace = function () {
  // Convert the transform onto the space coordinate plane.
  // Return a new SpaceTransform.
  //
  // Implementation note:
  //   We already have coord. transf. from the current plane to the space:
  //     this._T

  // To simulate the transformation on space:
  // 1) convert from space to the plane: this._T.inverse()
  // 2) apply the transformation
  // 3) convert from plane back to the space: this._T
  var tOnSpace = this._T.multiplyBy(this.T.multiplyBy(this._T.inverse()));
  var spaceMock = {'_T': Transform.IDENTITY};
  return new SpaceTransform(tOnSpace, spaceMock);
};

module.exports = SpaceTransform;
