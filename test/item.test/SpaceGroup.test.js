var taaspace = require('../../index')
var Space = taaspace.Space
var SpaceGroup = taaspace.SpaceGroup
var Path = taaspace.geom.Path
var Vector = taaspace.geom.Vector

module.exports = function (test) {
  test('constructor', function (t) {
    t.throws(function () {
      var v = new SpaceGroup() // eslint-disable-line
    }, /newParent/, 'A parent is required')
    t.end()
  })

  test('#getHull', function (t) {
    var space = new Space()
    var g = new SpaceGroup(space)
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    g1.translate(g1.atMid(), space.at(-10, -10))
    g2.translate(g2.atMid(), space.at(10, 10))

    t.ok(g.getHull().equal(space.getHull(), 'hulls equal'))
    t.ok(g.getHull().toSpace().equal(new Path([
      new Vector(-10, -10),
      new Vector(10, 10)
    ])), 'hull correct')
    t.end()
  })
}
