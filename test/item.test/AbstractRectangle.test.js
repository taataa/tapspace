var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceView = tapspace.SpaceView
var SpacePixel = tapspace.SpacePixel
var Vector = tapspace.geom.Vector
var Size = tapspace.geom.Size

module.exports = function (test) {
  test('should have an id', function (t) {
    var space = new Space()
    var a = new SpacePixel('black', space)
    var b = new SpacePixel('black', space)
    t.equal(typeof a.id, 'string')
    t.equal(typeof b.id, 'string')
    t.notEqual(a.id, b.id)
    t.end()
  })

  test('should be removable', function (t) {
    var space = new Space()
    var a = new SpacePixel('black', space)
    a.remove()
    t.equal(space._children.hasOwnProperty(a.id), false, 'removed ok')
    t.end()
  })

  test('should be able to return a IVector', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var a = new SpacePixel('black', space)
    var p = a.atNorm(1, 1)
    var vp = p.to(view)
    t.equal(vp.x, 1)
    t.equal(vp.y, 1)
    t.end()
  })

  test('should be able to give and take Transform objects', function (t) {
    var space = new Space()
    var px = new SpacePixel('black', space)

    // Move to to unit square.
    px.translateScale(
      [px.atNW(), px.atSE()],
      [space.at(-10, -10), space.at(10, 10)]
    )
    // Store position
    var lt = px.getLocalITransform()

    // Rotate 1/2π radians
    var rt = lt.rotate(space.at(0, 0), 1)
    px.setLocalITransform(rt)

    // Ensure movement
    var se = px.atSE().to(space)
    t.notEqual(se.x, 10, 'corner moved')
    t.notEqual(se.y, 10, 'corner moved')

    // Revert back
    px.setLocalITransform(lt)

    // Ensure
    var seb = px.atSE().to(space)
    t.equal(seb.x, 10, 'corner back')
    t.equal(seb.y, 10, 'corner back')
    t.end()
  })

  test('#fitScale squares', function (t) {
    var space = new Space()

    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', space)

    px2.scale(px2.atMid(), 7)
    px2.fitScale(px1)

    t.ok(px2.getHull().equals(px1.getHull()), 'hulls equal')
    t.end()
  })

  test('#fitScale rectangles', function (t) {
    //
    //   +--------------+
    //   |        px1   |
    //   ++------------++
    //   ||    px2     ||
    //   ++------------++
    //   |              |
    //   +--------------+
    //
    var space = new Space()

    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', space)

    px2.setSize(2, 1)
    px2.fitScale(px1)

    var h2 = px2.getHull().toSpace()

    t.ok(h2.get(0).equals(new Vector(-0.5, 0)), 'correct NW')
    t.ok(h2.get(1).equals(new Vector(-0.5, 1)), 'correct SW')
    t.ok(h2.get(2).equals(new Vector(1.5, 1)), 'correct SE')
    t.ok(h2.get(3).equals(new Vector(1.5, 0)), 'correct NE')
    t.end()
  })

  test('#fitSize', function (t) {
    var space = new Space()

    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', space)

    // Fit px2's size to upscaled px1
    px1.scale(px1.atNW(), 4)
    px2.fitSize(px1)

    t.ok(px1.getSize().equal(new Size(1, 1)), 'only scaled')
    t.ok(px2.getSize().equal(new Size(4, 4)), 'only resized')
    t.end()
  })
}
