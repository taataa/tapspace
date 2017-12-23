var taaspace = require('../index')

module.exports = function (test) {
  test('#getLocalTransform: in parent\'s coord system', function (t) {
    var space = new taaspace.Space()
    var p = new taaspace.SpacePixel(space)
    var x = new taaspace.SpacePixel(p)  // a child of p

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

  test('#getGlobalTransform: return identity tr. for space', function (t) {
    var space = new taaspace.Space()
    var gt = space.getGlobalTransform()
    var id = taaspace.InvariantTransform.IDENTITY
    t.ok(gt.equals(id), 'identity transform')
    t.end()
  })

  test('#getGlobalTransform: equal to local transform of child', function (t) {
    var space = new taaspace.Space()
    // SpacePixel is a SpacePlane
    var px = new taaspace.SpacePixel(space)
    px.translate(space.at(0, 0), space.at(1, 1))
    var gt = px.getGlobalTransform()
    var lt = px.getLocalTransform()
    // Represents same transformation
    t.ok(gt.equals(lt), 'local match global')
    t.end()
  })
}
