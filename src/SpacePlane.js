// API v0.2.0
var SpacePoint = require('./SpacePoint');

var SpacePlane = function (emitter) {
  emitter.T = null;
  emitter.at = function (xy) {
    return new SpacePoint(xy, this);
  };
};

module.exports = SpacePlane;
