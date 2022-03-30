var tapspace = require('../../index')
var Size = tapspace.geom.Size
var ISize = tapspace.geom.ISize

module.exports = function (test) {
  // Test cases

  test('#to', function (t) {
    var g = new tapspace.SpaceGroup()
    var g2 = new tapspace.SpaceGroup()
    g.addChild(g2)

    g2.setLocalTransform(tapspace.geom.Transform.X2)

    var s = new Size(1, 1)
    var is = new ISize(s, g)

    var sg2 = is.to(g2)

    t.ok(sg2.almostEqual(new Size(0.5, 0.5)))

    t.end()
  })
}
