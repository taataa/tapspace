var tapspace = require('../../index')
var Size = tapspace.geom.Size

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    t.throws(function () {
      var s = new Size() // eslint-disable-line
    })
    t.end()
  })

  test('#almostEqual & #equal', function (t) {
    var a = new Size(10, -8)
    var b = new Size(10, -8)
    var c = new Size(10, -8 + tapspace.geom.EPSILON / 2)
    var d = new Size(10, -9)

    t.ok(a.equal(b), 'a b equal')
    t.notOk(a.equal(c), 'a c not equal')
    t.ok(a.almostEqual(c), 'a c almost equal')
    t.notOk(a.almostEqual(d), 'a d almost equal')

    t.end()
  })

  test('#getWidth & #getHeight', function (t) {
    var s = new Size(10, -8)
    t.equal(s.getWidth(), 10, 'width')
    t.equal(s.getHeight(), -8, 'height')
    t.end()
  })

  test('#transform', function (t) {
    var s = new Size(10, -8)
    var translation = new tapspace.geom.Transform(1, 0, 5, 5)
    var scaling = tapspace.geom.Transform.X2

    var ts = s.transform(translation)
    var ss = s.transform(scaling)

    t.ok(s.equal(ts), 'translation does not affect')
    t.notOk(s.equal(ss), 'scaling affects')
    t.ok(ss.equal(new Size(20, -16)), 'doubled')

    t.end()
  })
}
