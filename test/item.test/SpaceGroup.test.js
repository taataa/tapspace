var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceGroup = tapspace.SpaceGroup
var SpacePixel = tapspace.SpacePixel
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

  test('#copy', function (t, ctx) {
    var space = new Space()
    var g = new SpaceGroup(space)
    var pxb = new SpacePixel('blue')
    g.addChild(pxb)
    var pxr = new SpacePixel('red', g)
    pxr.translate(pxr.atNW(), space.at(1, 0))

    var c = g.copy()

    t.notEqual(c, g, 'not same object')
    t.notEqual(c.getFirstChild(), g.getFirstChild(), 'not same children')
    t.equal(c.getChildren().length, g.getChildren().length, 'same num chldrn')
    t.equal(c.getFirstChild().color, g.getFirstChild().color, 'same color')
    t.notOk(
      c.getFirstChild().atMid().equal(c.getLastChild().atMid()),
      'preserve arrangement'
    )
    t.ok(c.isRoot(), 'is root')

    t.end()
  })
}
