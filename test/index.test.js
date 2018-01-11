// Combines test suites and runs them as single tape.
//
var harness = require('./lib/harness')

var UNITS = {
  Rectangle: require('./Rectangle.test'),
  Vector: require('./Vector.test'),
  Grid: require('./Grid.test'),
  InvariantScalar: require('./InvariantScalar.test'),
  InvariantVector: require('./InvariantVector.test'),
  InvariantTransform: require('./InvariantTransform.test'),
  meta: require('./meta.test'),
  SpaceViewHTML: require('./SpaceViewHTML.test'),
  Space: require('./Space.test'),
  SpaceHTML: require('./SpaceHTML.test'),
  SpaceNode: require('./SpaceNode.test'),
  SpacePlane: require('./SpacePlane.test'),
  // SpacePoint: require('./SpacePoint.test'),
  SpaceRectangle: require('./SpaceRectangle.test'),
  // SpaceTransform: require('./SpaceTransform.test'),
  SpaceTransformer: require('./SpaceTransformer.test'),
  SpaceGroup: require('./SpaceGroup.test'),
  preload: require('./preload.test'),
  version: require('./version.test')
}

for (var unit in UNITS) {
  if (UNITS.hasOwnProperty(unit)) {
    UNITS[unit](harness(unit))
  }
}
