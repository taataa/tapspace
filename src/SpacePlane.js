// API v0.6.0

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
  emitter._T = new nudged.Transform(1, 0, 0, 0); // identity transformation

  emitter.at = at;
};

module.exports = SpacePlane;
