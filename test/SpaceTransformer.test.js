var taaspace = require('../index')

module.exports = function (test) {
  test('#transformBy: should take an identity PITransform', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)
    var tr = taaspace.InvariantTransform.IDENTITY
    px.transformBy(tr)

    t.equal(px.atSE().toSpace().x, 1)
    t.equal(px.atSE().toSpace().y, 1)
    t.equal(px.atSE().to(space).x, 1)
    t.equal(px.atSE().to(space).y, 1)
    t.end()
  })

  test('#transformBy: should take a simple translation', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)
    var id = taaspace.InvariantTransform.IDENTITY
    var tr = id.translate(space.at(0, 0), space.at(1, 1))

    var s = px.atSE().toSpace()
    t.equal(s.x, 1)
    t.equal(s.y, 1)

    px.transformBy(tr)
    var ss = px.atSE().toSpace()
    t.equal(ss.x, 2)
    t.equal(ss.y, 2)

    px.transformBy(tr)
    var sss = px.atSE().to(space)
    t.equal(sss.x, 3)
    t.equal(sss.y, 3)

    t.end()
  })

  test('#setGlobalTransform: keep in place during setParent', function (t) {
    // Setup
    var p
    var space = new taaspace.Space()
    var px1 = new taaspace.SpacePixel(space)
    var px2 = new taaspace.SpacePixel(px1)
    var px3 = new taaspace.SpacePixel(px2)

    // Ensure initial location of px3
    t.ok(px2.atMid().equals(px3.atMid()), 'px2 and px3 fully overlap before')

    px1.translate(space.at(0, 0), space.at(2, 2))

    // State after translation
    t.ok(px1.atMid().equals(px2.atMid()), 'px1 and px2 match after transl.')
    t.ok(px2.atMid().equals(px3.atMid()), 'px2 and px3 match after transl.')
    p = px3.atMid().to(space)
    t.equal(p.x, 2.5, 'px3 at correct pos')
    t.equal(p.y, 2.5, 'px3 at correct pos')

    // Scale
    px2.scale(px2.atMid(), 2)

    // Ensure state after scaling
    t.ok(px2.atMid().equals(px3.atMid()), 'px2 and px3 match after px2 scale')

    // Take test points for comparison
    var tp1 = px3.atNE()
    var tp2 = px3.atSW()

    // Reparent px3 so that it should keep still.
    var gt = px3.getGlobalTransform()
    px3.setParent(space)
    px3.setGlobalTransform(gt)

    // Test if the point remains at same place.
    t.ok(px3.atNE().equals(tp1), 'north-east remains still')
    t.ok(px3.atSW().equals(tp2), 'south-west remains still')
    t.end()
  })

  test('#setGlobalTransform: work with getLocalTransform', function (t) {
    var space = new taaspace.Space()
    var px, tr, lt, gt

    px = new taaspace.SpacePixel(space)

    // chain
    tr = taaspace.InvariantTransform.IDENTITY
      .translate(space.at(0, 0), space.at(100, 100))
      .rotate(px.atMid(), Math.PI / 4)
      .scale(px.atMid(), 2)

    px.transformBy(tr)

    lt = px.getLocalTransform()
    px.setGlobalTransform(lt)

    gt = px.getGlobalTransform()

    t.ok(lt.equals(tr))
    t.ok(gt.equals(tr))
    t.end()
  })
}
