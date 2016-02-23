// API v0.5.0
//var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');

/*var normalize = function (points, plane) {
  // Transform all the points onto the given plane.
  // Arguments
  //   points, a single spacepoint or a list of spacepoints
  //   plane, a SpacePlane e.g. a SpaceTaa where to normalize
  var i, p, np;
  var normalized = [];
  if (!Array.isArray(points)) {
    points = [points];
  }
  for (i = 0; i < points.length; i += 1) {
    p = points[i];
    np = p.to(plane).xy;
    normalized.push(np);
  }
  return normalized;
};*/

var SpaceRectangle = function (transformer) {

  var t = transformer;  // Alias

  // Rectangles have size.
  // In its own coordinates, rectangle's right bottom corner
  // is located at [width, height].
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  var width = 1;
  var height = 1;

  t.resize = function (dimensions) {
    // Parameter
    //   dimensions, [width, height]
    width = dimensions[0];
    height = dimensions[1];

    t.emit('resized', t);
  };

  t.getSize = function () {
    return [width, height];
  };

  t.atNorm = function (xy) {
    // Return a SpacePoint by coordinates normalized about the size.
    // atNorm([1,0]) returns the point at the right upper corner.
    return new SpacePoint([width * xy[0], height * xy[1]], t);
  };

  t.atMid = function () {
    return new SpacePoint([width / 2, height / 2], t);
  };

  t.atMidN = function () {
    return new SpacePoint([width / 2, 0], t);
  };

  t.atMidW = function () {
    return new SpacePoint([0, height / 2], t);
  };

  t.atMidE = function () {
    return new SpacePoint([width, height / 2], t);
  };

  t.atMidS = function () {
    return new SpacePoint([width / 2, height], t);
  };

  t.atNW = function () {
    return new SpacePoint([0, 0], t);
  };

  t.atNE = function () {
    return new SpacePoint([width, 0], t);
  };

  t.atSW = function () {
    return new SpacePoint([0, height], t);
  };

  t.atSE = function () {
    return new SpacePoint([width, height], t);
  };

};

module.exports = SpaceRectangle;
