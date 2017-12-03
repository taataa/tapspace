var taaspace = require('../index')

module.exports = function (test) {

  test('should have an id', function (t) {
    var space = new taaspace.Space()
    var a = new taaspace.SpacePixel(space)
    var b = new taaspace.SpacePixel(space)
    t.equal(typeof a.id, 'string')
    t.equal(typeof b.id, 'string')
    t.notEqual(a.id, b.id)
    t.end()
  })

  test('should be removable', function (t) {
    var space = new taaspace.Space()
    var a = new taaspace.SpacePixel(space)
    a.remove()
    t.equal(space._children.hasOwnProperty(a.id), false)
    t.end()
  })

  test('should be able to return a SpacePoint', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.HTMLSpaceView(space, ctx.container)
    var a = new taaspace.SpacePixel(space)
    var p = a.atNorm([1, 1])
    var vp = p.to(view)
    t.deepEqual(vp.xy, [1, 1])
    t.end()
  })

  test('should be able to give and take Transform objects', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)
    // Move to to unit square.
    px.translateScale(
      [px.atNW(), px.atSE()],
      [space.at([0, 0]), space.at([1, 1])]
    )
    var lt = px.getLocalTransform()

    // Rotate 1/2π radians
    var rt = lt.rotate(space.at([0, 0]), 1)
    px.setLocalTransform(rt)

    t.notDeepEqual(px.atSE().to(space).xy, [1, 1], 'corner moved')

    // Revert back
    px.setLocalTransform(lt)
    t.deepEqual(px.atSE().to(space).xy, [1, 1], 'corner back')
    t.end()
  })

}
