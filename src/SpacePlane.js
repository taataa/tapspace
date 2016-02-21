// API v0.3.0

var SpacePoint = require('./SpacePoint');

var at = function (xy) {
  if (xy.length !== 2) {  // DEBUG TODO remove this
    throw 'Invalid point, use array [x, y]';
  }
  return new SpacePoint(xy, this);  // Note: this === emitter
};

var SpacePlane = function (emitter) {
  // Coordinate system. The transformation from the space to the plane.
  emitter._T = null;

  emitter.at = at;
};

module.exports = SpacePlane;
