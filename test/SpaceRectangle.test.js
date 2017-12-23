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
    t.equal(space._children.hasOwnProperty(a.id), false, 'removed ok')
    t.end()
  })

  test('should be able to return a SpacePoint', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    view.mount(ctx.container)

    var a = new taaspace.SpacePixel(space)
    var p = a.atNorm(1, 1)
    var vp = p.to(view)
    t.equal(vp.x, 1)
    t.equal(vp.y, 1)
    t.end()
  })

  test('should be able to give and take Transform objects', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)

    // Move to to unit square.
    px.translateScale(
      [px.atNW(), px.atSE()],
      [space.at(-10, -10), space.at(10, 10)]
    )
    // Store position
    var lt = px.getLocalTransform()

    // Rotate 1/2π radians
    var rt = lt.rotate(space.at(0, 0), 1)
    px.setLocalTransform(rt)

    // Ensure movement
    var se = px.atSE().to(space)
    t.notEqual(se.x, 10, 'corner moved')
    t.notEqual(se.y, 10, 'corner moved')

    // Revert back
    px.setLocalTransform(lt)

    // Ensure
    var seb = px.atSE().to(space)
    t.equal(seb.x, 10, 'corner back')
    t.equal(seb.y, 10, 'corner back')
    t.end()
  })
}
