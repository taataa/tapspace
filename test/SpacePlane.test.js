var taaspace = require('../index')

module.exports = function (test) {
  test('#getLocalTransform: in plane\'s coord system', function (t) {
    var space = new taaspace.Space()
    var p = new taaspace.SpacePixel(space)
    var x = new taaspace.SpacePixel(p)  // a child of p

    // The local transform of x should remain same regardless of p's move.
    // The global transform of x should change when p moves
    var xlt0 = x.getLocalTransform()
    var xgt0 = x.getGlobalTransform()
    p.translate(space.at([0, 0]), space.at([1, 1]))
    var xlt1 = x.getLocalTransform()
    var xgt1 = x.getGlobalTransform()
    t.ok(xlt0._T.equals(xlt1._T), 'local tr. should not change')
    t.notOk(xgt0.equals(xgt1), 'global tr. should change')

    // Global transform of x should equal the local transform of p
    // because x has not moved yet.
    //t.deepEqual(xlt1._T, p._T, 'local transforms match')
    var plt1 = p.getLocalTransform()
    t.ok(plt1.equals(xgt1), 'transforms match')
    t.end()
  })

  test('#getGlobalTransform: return identity tr. for space', function (t) {
    var space = new taaspace.Space()
    var gt = space.getGlobalTransform()
    var id = new taaspace.SpaceTransform(space)
    t.ok(gt.equals(id), 'identity transform')
    t.end()
  })

  test('#getGlobalTransform: equal to local transform of child', function (t) {
    var space = new taaspace.Space()
    // SpacePixel is a SpacePlane
    var px = new taaspace.SpacePixel(space)
    px.translate(space.at([0, 0]), space.at([1, 1]))
    var gt = px.getGlobalTransform()
    var lt = px.getLocalTransform()
    // Represents same transformation
    t.ok(gt.equals(lt))
    t.end()
  })
}
