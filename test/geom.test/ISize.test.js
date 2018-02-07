var taaspace = require('../../index')
var Size = taaspace.geom.Size
var ISize = taaspace.geom.ISize

module.exports = function (test) {
  // Test cases

  test('#to', function (t) {
    var g = new taaspace.SpaceGroup()
    var g2 = new taaspace.SpaceGroup()
    g.addChild(g2)

    g2.setLocalTransform(taaspace.geom.Transform.X2)

    var s = new Size(1, 1)
    var is = new ISize(s, g)

    var sg2 = is.to(g2)

    t.ok(sg2.almostEqual(new Size(0.5, 0.5)))

    t.end()
  })
}
