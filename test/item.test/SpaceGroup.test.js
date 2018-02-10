var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceGroup = tapspace.SpaceGroup
var Path = tapspace.geom.Path
var Vector = tapspace.geom.Vector

module.exports = function (test) {
  test('#getHull', function (t) {
    var space = new Space()
    var g = new SpaceGroup(space)
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup()
    g.addChild(g2) // alternative

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
