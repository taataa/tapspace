// API v0.6.0

var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');

var at = function (xy) {
  if (xy.length !== 2) {  // DEBUG TODO remove this
    throw 'Invalid point, use array [x, y]';
  }
  return new SpacePoint(xy, this);  // Note: this === emitter
};

var SpacePlane = function (emitter) {
  // Coordinate system. The transformation from the space to the plane.
  // For Space, it is obviously the identity transform.
  emitter._T = new nudged.Transform(1, 0, 0, 0); // identity transformation

  emitter.at = at;
};

module.exports = SpacePlane;
