// API v0.3.0

var SpacePoint = require('./SpacePoint');

var at = function (xy) {
  return new SpacePoint(xy, this);
};

var SpacePlane = function (emitter) {
  emitter._T = null;
  emitter.at = at;
};

module.exports = SpacePlane;
