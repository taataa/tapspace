var taaspace = require('../../index')
var Rectangle = taaspace.geom.Rectangle

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    t.throws(function () {
      var r = new Rectangle() // eslint-disable-line
    })
    t.end()
  })

  test('#atNorm', function (t) {
    var r = new Rectangle(100, 100)
    var v = r.atNorm(1, 1)
    t.equal(v.x, 100, 'x')
    t.equal(v.y, 100, 'y')

    t.end()
  })

  test('#scale & #equals', function (t) {
    var r = new Rectangle(100, 100)
    var r2 = r.scale(4)
    t.equal(r2.w, 400, 'x')
    t.equal(r2.h, 400, 'y')

    var r3 = new Rectangle(400, 400)
    t.ok(r2.equals(r3))

    t.end()
  })
}
