// Combines test suites and runs them as single tape.
//
var harness = require('./lib/harness')

var UNITS = {
  meta: require('./meta.test'),
  preload: require('./preload.test'),
  version: require('./version.test'),

  Rectangle: require('./geom.test/Rectangle.test'),
  Vector: require('./geom.test/Vector.test'),
  Path: require('./geom.test/Path.test'),
  Grid: require('./geom.test/Grid.test'),
  IScalar: require('./geom.test/IScalar.test'),
  IVector: require('./geom.test/IVector.test'),
  ITransform: require('./geom.test/ITransform.test'),
  IGrid: require('./geom.test/IGrid.test'),

  AbstractNode: require('./item.test/AbstractNode.test'),
  AbstractPlane: require('./item.test/AbstractPlane.test'),
  AbstractRectangle: require('./item.test/AbstractRectangle.test'),
  Space: require('./item.test/Space.test'),
  SpaceGroup: require('./item.test/SpaceGroup.test'),
  SpaceHTML: require('./item.test/SpaceHTML.test'),
  SpaceView: require('./item.test/SpaceView.test')
}

for (var unit in UNITS) {
  if (UNITS.hasOwnProperty(unit)) {
    UNITS[unit](harness(unit))
  }
}
