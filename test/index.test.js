// Combines test suites and runs them as single tape.
//
var harness = require('./lib/harness')

var UNITS = {
  Rectangle: require('./Rectangle.test'),
  Vector: require('./Vector.test'),
  Path: require('./Path.test'),
  Grid: require('./Grid.test'),
  IScalar: require('./IScalar.test'),
  IVector: require('./IVector.test'),
  ITransform: require('./ITransform.test'),
  IGrid: require('./IGrid.test'),
  meta: require('./meta.test'),
  SpaceViewHTML: require('./SpaceViewHTML.test'),
  Space: require('./Space.test'),
  SpaceHTML: require('./SpaceHTML.test'),
  AbstractNode: require('./AbstractNode.test'),
  AbstractPlane: require('./AbstractPlane.test'),
  AbstractRectangle: require('./AbstractRectangle.test'),
  SpaceGroup: require('./SpaceGroup.test'),
  preload: require('./preload.test'),
  version: require('./version.test')
}

for (var unit in UNITS) {
  if (UNITS.hasOwnProperty(unit)) {
    UNITS[unit](harness(unit))
  }
}
