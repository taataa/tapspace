var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('constructor', function (t) {
    t.throws(function () {
      var v = new taaspace.IVector() // eslint-disable-line
    })
    t.end()
  })

  test('#add & #offset', function (t) {
    var v = new taaspace.Vector(1, 1)
    var iv = new taaspace.IVector(v)
    var iv2 = iv.add(iv)
    t.notOk(iv.equals(iv2), 'result not equal')

    var v3 = new taaspace.Vector(2, 2)
    var iv3 = new taaspace.IVector(v3)
    t.ok(iv2.equals(iv3))

    var ov = iv.offset(1, 1)
    t.ok(ov.equals(iv2), 'offset is equivalent to addition')

    t.end()
  })

  test('#distance', function (t) {
    var v = new taaspace.Vector(-1, -1)
    var iv = new taaspace.IVector(v)

    t.equal(iv.distance(iv).toSpace(), 0, 'zero distance to self')

    var v2 = new taaspace.Vector(1, -1)
    var iv2 = new taaspace.IVector(v2)

    t.equal(iv.distance(iv2).toSpace(), 2, 'simple distance')

    t.throws(function () {
      iv.distance('a')
    }, 'detect programming error')

    t.throws(function () {
      iv.distance()
    }, 'detect programming error')

    t.end()
  })

  test('#equals', function (t) {
    var v = new taaspace.Vector(0, 0)
    var iv = new taaspace.IVector(v)

    var v2 = new taaspace.Vector(1, 1)
    var iv2 = new taaspace.IVector(v2)

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

  test('#polarOffset: allow 0 and 2PI', function (t) {
    var v = new taaspace.Vector(100, 100)
    var iv = new taaspace.IVector(v)
    var a = iv.polarOffset(100, 2 * Math.PI)
    var b = iv.polarOffset(100, 0)
    t.ok(a.distance(b).toSpace() < 0.001, 'match')
    t.end()
  })

  test('#polarOffset: allow 0 distance', function (t) {
    var v = new taaspace.Vector(100, 100)
    var iv = new taaspace.IVector(v)
    var a = iv.polarOffset(0, Math.PI / 3)
    t.ok(a.equals(iv), 'vectors match')
    t.end()
  })

  test('#polarOffset: allow angles outside [0, 2PI]', function (t) {
    var v = new taaspace.Vector(100, 100)
    var iv = new taaspace.IVector(v)
    var a = iv.polarOffset(100, 3 * Math.PI)
    var b = iv.polarOffset(100, Math.PI)
    t.ok(a.distance(b).toSpace() < 0.001, 'match')
    t.end()
  })
}
