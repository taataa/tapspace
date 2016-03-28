// API v3.0.0

var SpacePoint = require('./SpacePoint');

var SpaceRectangle = function (transformer) {

  var t = transformer;  // Alias

  // Rectangles have size.
  // In its own coordinates, rectangle's right bottom corner
  // is located at [width, height].
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  var width = 1;
  var height = 1;

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

  t.getSize = function () {
    return [width, height];
  };

  t.resize = function (dimensions) {
    // Parameter
    //   dimensions, [width, height]
    width = dimensions[0];
    height = dimensions[1];

    this.emit('resized', t);
  };

};

module.exports = SpaceRectangle;
