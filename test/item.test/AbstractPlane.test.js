var tapspace = require('../../index')
var Transform = tapspace.geom.Transform
var ITransform = tapspace.geom.ITransform
var Space = tapspace.Space
var SpacePixel = tapspace.SpacePixel

module.exports = function (test) {
  test('#getLocalTransform: in parent\'s coord system', function (t) {
    var space = new Space()
    var p = new SpacePixel('black', space)
    var x = new SpacePixel('black', p)  // a child of p

    // The local transform of x should remain same regardless of p's move.
    // The global transform of x should change when p moves
    var xlt0 = x.getLocalTransform()
    var xgt0 = x.getGlobalTransform()

    // Move p
    p.translate(space.at(0, 0), space.at(1, 1))

    var xlt1 = x.getLocalTransform()
    var xgt1 = x.getGlobalTransform()

    t.ok(xlt0.equals(xlt1), 'local tr. of x should not change')
    t.notOk(xgt0.equals(xgt1), 'global tr. of x should change')

    // Global transform of x should equal the local transform of p
    // because x has not moved yet.
    var plt1 = p.getLocalTransform()
    t.ok(plt1.equals(xgt1), 'transforms match')
    t.end()
  })

  test('#getGlobalITransform: return identity tr. for space', function (t) {
    var space = new Space()
    var gt = space.getGlobalITransform()
    var id = ITransform.IDENTITY
    t.ok(gt.equals(id), 'identity transform')
    t.end()
  })

  test('#getGlobalTransform: equal to local transform of child', function (t) {
    var space = new Space()
    // SpacePixel is a AbstractPlane
    var px = new SpacePixel('black', space)
    px.translate(space.at(0, 0), space.at(1, 1))
    var gt = px.getGlobalTransform()
    var lt = px.getLocalTransform()
    // Represents same transformation
    t.ok(gt.equals(lt), 'local match global')
    t.end()
  })

  test('#transformBy: should take an identity ITransform', function (t) {
    var space = new Space()
    var px = new SpacePixel('black', space)
    var tr = ITransform.IDENTITY
    px.transformBy(tr)

    t.equal(px.atSE().toSpace().x, 1)
    t.equal(px.atSE().toSpace().y, 1)
    t.equal(px.atSE().to(space).x, 1)
    t.equal(px.atSE().to(space).y, 1)
    t.end()
  })

  test('#transformBy: should take a simple translation', function (t) {
    var space = new Space()
    var px = new SpacePixel('black', space)
    var id = ITransform.IDENTITY
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

  test('#transformBy: emits applied transformation', function (t) {
    var space = new Space()
    var px = new SpacePixel('black', space)
    var tr = Transform.X2

    px.on('transformed', function (ev) {
      var dT = ev.newTransform.multiplyRight(ev.oldTransform.inverse())
      t.equal(ev.source, px, 'correct source')
      t.ok(tr.almostEqual(dT), 'correct applied tr')
      t.end()
    })

    px.transformBy(tr)
  })

  test('#setGlobalTransform: keep in place during setParent', function (t) {
    // Setup
    var p
    var space = new Space()
    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', px1)
    var px3 = new SpacePixel('black', px2)

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

  test('#setGlobalITransform: work with getLocalITransform', function (t) {
    var space = new Space()
    var px, tr, lt, gt

    px = new SpacePixel('black', space)

    // chain
    tr = ITransform.IDENTITY
      .translate(space.at(0, 0), space.at(100, 100))
      .rotate(px.atMid(), Math.PI / 4)
      .scale(px.atMid(), 2)

    px.transformBy(tr)

    lt = px.getLocalITransform()
    px.setGlobalITransform(lt)

    gt = px.getGlobalITransform()

    t.ok(lt.equals(tr))
    t.ok(gt.equals(tr))
    t.end()
  })
}
