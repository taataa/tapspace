/*
SpacePlane
API v3.0.0

A SpacePlane represents a coordinate system. It does not include
methods to transform the system. SpacePlane and SpaceTransformer are separated
because we want to have planes that cannot be transformed, as the Space.

*/

var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');
var SpaceTransform = require('./SpaceTransform');

var at = function (xy) {
  // Return
  //   A SpacePoint at (x,y) on the plane.
  if (xy.length !== 2) {  // DEBUG TODO remove this
    throw 'Invalid point, use array [x, y]';
  }
  return new SpacePoint(this, xy);  // Note: this === spaceNode
};

var SpacePlane = function (spaceNode) {
  // Parameters
  //   spaceNode
  //     A SpaceNode to monkey patch to SpacePlane

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
  spaceNode._T = nudged.Transform.IDENTITY; // identity transformation

  spaceNode.at = at;

  spaceNode.getLocalTransform = function () {
    // Local transform from plane to parent, represented as SpaceTransform.
    //
    // Return
    //   SpaceTransform
    //
    // Note:
    //   return transformation from plane to parent, i.e.
    //     xy_parent = T * xy_plane
    // Needed when we want to store transformer's position for later use.
    if (this._parent === null) {
      return new SpaceTransform(this);
    } // else
    return new SpaceTransform(this._parent, this._T);
  };

  spaceNode.getGlobalTransform = function () {
    // Return
    //   SpaceTransform, transformation from the plane to root.
    //
    // Dev note:
    //   Local transformations go like:
    //     xy_parent = T_plane * xy_plane
    //     xy_parent_parent = T_parent * xy_parent
    //     ...
    //     xy_root = T_parent_parent..._parent * xy_parent_parent..._parent
    //   Therefore global transformation is:
    //     xy_root = T_parent_..._parent * ... * T_parent * T_plane * xy_plane
    var T, plane;

    if (this._parent === null) {
      // We must mock the space. Otherwise, if we put self to
      // SpaceTransform as reference, SpaceTransform constructor
      // will ask for self.getGlobalTransform and thus we end up
      // in a endless loop.
      plane = { _T: nudged.Transform.IDENTITY };
      return new SpaceTransform(plane);  // We are root, thus identity
    } // else

    T = this._T;
    plane = this._parent;
    while (plane._parent !== null) {
      T = plane._T.multiplyBy(T);
      plane = plane._parent;
    }

    // plane._parent === null, hence plane is the root.
    return new SpaceTransform(plane, T);
  };

  spaceNode.resetTransform = function () {
    // Become space. Called e.g. when plane is removed from parent.
    this._T = nudged.Transform.IDENTITY;
  };

};

module.exports = SpacePlane;
