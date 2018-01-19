var taaspace = require('../index')
var SpaceGroup = taaspace.SpaceGroup

module.exports = function (test) {
  test('constructor', function (t) {
    t.throws(function () {
      var v = new SpaceGroup() // eslint-disable-line
    }, /newParent/, 'A parent is required')
    t.end()
  })

  test('#getHull', function (t) {
    var space = new taaspace.Space()
    var g = new taaspace.SpaceGroup(space)
    var g1 = new taaspace.SpaceGroup(g)
    var g2 = new taaspace.SpaceGroup(g)
    g1.translate(g1.atMid(), space.at(-10, -10))
    g2.translate(g2.atMid(), space.at(10, 10))

    t.ok(g.getHull().equal(space.getHull(), 'hulls equal'))
    t.ok(g.getHull().toSpace().equal(new taaspace.Path([
      new taaspace.Vector(-10, -10),
      new taaspace.Vector(10, 10)
    ])), 'hull correct')
    t.end()
  })
}
