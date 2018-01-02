var taaspace = require('../index')
var Vector = taaspace.Vector

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    t.throws(function () {
      var v = new Vector() // eslint-disable-line
    })
    t.end()
  })

  test('#add & #equals', function (t) {
    var v = new Vector(1, 1)
    var v2 = v.add(v)
    t.notOk(v.equals(v2), 'result not equal')
    t.equal(v2.x, 2, 'x')
    t.equal(v2.y, 2, 'y')

    t.end()
  })

  test('#min & #max', function (t) {
    var nw = new Vector(-1, -1)
    var se = new Vector(1, 1)

    t.equal(nw.min(se).x, -1)
    t.equal(nw.min(se).y, -1)

    t.equal(nw.max(se).x, 1)
    t.equal(nw.max(se).y, 1)

    t.end()
  })
}
