var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('constructor', function (t) {
    t.throws(function () {
      var v = new taaspace.InvariantVector() // eslint-disable-line
    })
    t.end()
  })

  test('#add & #offset', function (t) {
    var v = new taaspace.Vector(1, 1)
    var iv = new taaspace.InvariantVector(v)
    var iv2 = iv.add(iv)
    t.notOk(iv.equals(iv2), 'result not equal')

    var v3 = new taaspace.Vector(2, 2)
    var iv3 = new taaspace.InvariantVector(v3)
    t.ok(iv2.equals(iv3))

    var ov = iv.offset(1, 1)
    t.ok(ov.equals(iv2), 'offset is equivalent to addition')

    t.end()
  })

  test('#equals', function (t) {
    var v = new taaspace.Vector(0, 0)
    var iv = new taaspace.InvariantVector(v)

    var v2 = new taaspace.Vector(1, 1)
    var iv2 = new taaspace.InvariantVector(v2)

    t.ok(iv.equals(iv), 'trivially equal to self')
    t.notOk(iv.equals(iv2), 'not equal')

    t.throws(function () {
      iv.equals()
    }, 'programming error should throw')

    t.throws(function () {
      iv.equals({})
    }, 'programming error should throw')

    t.end()
  })
}
