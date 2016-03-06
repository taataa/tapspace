/*
SpacePlane
API v0.6.0

A SpacePlane represents a coordinate system. It does not include
methods to transform the system. SpacePlane and Transformer are separated
because we want to have planes that cannot be transformed, as Space.

*/

var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');

var at = function (xy) {
  // Return
  //   A SpacePoint at (x,y) on the plane.
  if (xy.length !== 2) {  // DEBUG TODO remove this
    throw 'Invalid point, use array [x, y]';
  }
  return new SpacePoint(xy, this);  // Note: this === emitter
};

var SpacePlane = function (emitter) {
  // Parameters
  //   emitter
  //     A SpaceContainer to monkey patch to SpacePlane

  // Coordinate transformation.
  // The transformation from the plane to the parent (space).
  // See 2016-03-05-09
  // Let:
  //   x_space, a point in space
  //   x_plane, a point on the plane.
  //   T, the coordinate transformation of the plane
  // Then:
  //   x_space = T * x_plane
  //
  // For Space, it is obviously the identity transform:
  //   x_space = T * x_space
  emitter._T = nudged.Transform.IDENTITY; // identity transformation

  emitter.at = at;

  emitter.getTransform = function () {
    // Local transform from plane to parent
    //
    // Return
    //   transformation from plane to parent, i.e.
    //     xy_parent = T * xy_plane
    // Needed when we want to store transformer's position for later use.
    return this._T;
  };

  emitter.getGlobalTransform = function () {
    // Return
    //   transformation from the plane to root container.
    //
    // Dev note:
    //   Local transformations go like:
    //     xy_parent = T_plane * xy_plane
    //     xy_parent_parent = T_parent * xy_parent
    //     ...
    //     xy_root = T_parent_parent..._parent * xy_parent_parent..._parent
    //   Therefore global transformation is:
    //     xy_root = T_parent_..._parent * ... * T_parent * T_plane * xy_plane
    if (this._parent === null) {
      // TODO maybe too far: this._parent._parent might be sufficient.
      return this._T;
    } // else
    return this._parent.getGlobalTransform().multiplyBy(this._T);
  };

  emitter.resetTransform = function () {
    // Become space. Called e.g. when plane is removed from parent.
    this._T = nudged.Transform.IDENTITY;
  };
  
};

module.exports = SpacePlane;
