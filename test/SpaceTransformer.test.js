var taaspace = require('../index')

module.exports = function (test) {

  test('#transformBy: should take a identity SpaceTransform', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)
    var tr = new taaspace.SpaceTransform(space)
    px.transformBy(tr)

    t.deepEqual(px.atSE().xy, [1, 1])
    t.deepEqual(px.atSE().to(space).xy, [1, 1])
    t.end()
  })

  test('#transformBy: should take a simple translation', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)
    var tr = new taaspace.SpaceTransform(space)
    tr = tr.translate(space.at([0, 0]), space.at([1, 1]))
    t.deepEqual(px.atSE().xy, [1, 1])

    px.transformBy(tr)
    t.deepEqual(px.atSE().to(space).xy, [2, 2])

    px.transformBy(tr)
    t.deepEqual(px.atSE().to(space).xy, [3, 3])

    t.end()
  })

  test('#setGlobalTransform: keep in place during setParent', function (t) {
    // Setup
    var space = new taaspace.Space()
    var px1 = new taaspace.SpacePixel(space)
    var px2 = new taaspace.SpacePixel(px1)
    var px3 = new taaspace.SpacePixel(px2)

    px1.translate(space.at([0, 0]), space.at([2, 2]))
    px2.scale(px2.atMid(), 2)
    // Take test point for comparison
    var ne = px3.atNE().to(space)
    // Reparent px3 so that it should keep still.
    var gt = px3.getGlobalTransform()
    px3.setParent(space)
    px3.setGlobalTransform(gt)
    // Test if the point remains at same place.
    t.deepEqual(px3.atNE().to(space).xy, ne.xy)
    t.end()
  })

  test('#setGlobalTransform: work with getLocalTransform', function (t) {
    var space = new taaspace.Space()
    var px, tr, gt
    px = new taaspace.SpacePixel(space)
    tr = new taaspace.SpaceTransform(space)
      .translate(space.at([0, 0]), space.at([100, 100]))
      .rotate(px.atMid(), Math.PI / 4)
      .scale(px.atMid(), 2)
    px.transformBy(tr)
    gt = px.getGlobalTransform()
    px.setGlobalTransform(gt)
    gt = px.getGlobalTransform()
    t.ok(gt.equals(tr))
    t.end()
  })
}
