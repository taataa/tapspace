// Combines test suites and runs them as single tape.
//
var harness = require('./lib/harness')

var UNITS = {
  meta: require('./meta.test'),
  preload: require('./preload.test'),
  version: require('./version.test'),

  Grid: require('./geom.test/Grid.test'),
  IGrid: require('./geom.test/IGrid.test'),
  Path: require('./geom.test/Path.test'),
  IScalar: require('./geom.test/IScalar.test'),
  Size: require('./geom.test/Size.test'),
  ISize: require('./geom.test/ISize.test'),
  ITransform: require('./geom.test/ITransform.test'),
  Vector: require('./geom.test/Vector.test'),
  IVector: require('./geom.test/IVector.test'),

  AbstractNode: require('./item.test/AbstractNode.test'),
  AbstractPlane: require('./item.test/AbstractPlane.test'),
  AbstractRectangle: require('./item.test/AbstractRectangle.test'),
  Space: require('./item.test/Space.test'),
  SpaceGroup: require('./item.test/SpaceGroup.test'),
  SpaceHTML: require('./item.test/SpaceHTML.test'),
  SpaceView: require('./item.test/SpaceView.test'),

  Touchable: require('./interaction.test/Touchable.test')
}

for (var unit in UNITS) {
  if (UNITS.hasOwnProperty(unit)) {
    UNITS[unit](harness(unit))
  }
}
