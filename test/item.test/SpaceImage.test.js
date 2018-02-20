var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceImage = tapspace.SpaceImage

module.exports = function (test) {
  test('#copy', function (t, ctx) {
    var space = new Space()
    var si = new SpaceImage(ctx.images.black256, space)

    var c = si.copy()

    t.equal(c.image, ctx.images.black256, 'same image object')
    t.ok(c.isRoot(), 'is root')

    t.end()
  })
}
