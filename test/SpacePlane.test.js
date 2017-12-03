var taaspace = require('../index')

module.exports = function (test) {

  test('#getLocalTransform: in plane\'s coord system', function (t) {
    var space = new taaspace.Space()
    var p = new taaspace.SpacePixel(space)
    var x = new taaspace.SpacePixel(p)
    p.translate(space.at([0, 0]), space.at([1, 1]))
    var lt = x.getLocalTransform()
    t.ok(lt._T.equals(p._T), 'local transforms match')
    t.end()
  })

  test('#getGlobalTransform: return identity for space', function (t) {
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
