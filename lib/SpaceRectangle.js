// API v3.0.0

var SpacePoint = require('./SpacePoint')

var SpaceRectangle = function (spaceTransformer) {
  var t = spaceTransformer  // Alias

  // Rectangles have size.
  // In its own coordinates, rectangle's right bottom corner
  // is located at [width, height].
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  var width = 1
  var height = 1

  t.atNorm = function (xy) {
    // Return a SpacePoint by coordinates normalized about the size.
    // atNorm([1,0]) returns the point at the right upper corner.
    return new SpacePoint(t, [width * xy[0], height * xy[1]])
  }

  t.atMid = function () {
    return new SpacePoint(t, [width / 2, height / 2])
  }

  t.atMidN = function () {
    return new SpacePoint(t, [width / 2, 0])
  }

  t.atMidW = function () {
    return new SpacePoint(t, [0, height / 2])
  }

  t.atMidE = function () {
    return new SpacePoint(t, [width, height / 2])
  }

  t.atMidS = function () {
    return new SpacePoint(t, [width / 2, height])
  }

  t.atNW = function () {
    return new SpacePoint(t, [0, 0])
  }

  t.atNE = function () {
    return new SpacePoint(t, [width, 0])
  }

  t.atSW = function () {
    return new SpacePoint(t, [0, height])
  }

  t.atSE = function () {
    return new SpacePoint(t, [width, height])
  }

  t.getSize = function () {
    return [width, height]
  }

  t.resize = function (dimensions) {
    // Parameter
    //   dimensions, [width, height]
    width = dimensions[0]
    height = dimensions[1]

    this.emit('resized', t)
  }
}

module.exports = SpaceRectangle
