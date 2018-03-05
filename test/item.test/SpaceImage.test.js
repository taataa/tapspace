var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceImage = tapspace.SpaceImage

// Minimal data URL image: 1x1 transparent
var mini = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP' +
  '///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

module.exports = function (test) {
  test('#copy', function (t, ctx) {
    var space = new Space()
    var si = new SpaceImage(ctx.images.black256, space)

    var c = si.copy()

    t.equal(c.image, ctx.images.black256, 'same image object')
    t.ok(c.isRoot(), 'is root')

    t.end()
  })

  test('construct with image literal', function (t) {
    var si = new SpaceImage({
      src: mini,
      width: 1,
      height: 1
    })
    t.equal(si.getSize().height, 1, 'correct height')

    t.throws(function () {
      si = new SpaceImage({
        src: mini,
        width: 100
      })
    }, 'detect missing height')

    t.end()
  })
}
