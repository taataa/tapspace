var tapspace = require('../../index')
var IScalar = tapspace.geom.IScalar
var Vector = tapspace.geom.Vector
var IVector = tapspace.geom.IVector

module.exports = function (test) {
  // Test cases

  test('constructor', function (t) {
    t.throws(function () {
      var v = new IVector() // eslint-disable-line
    })
    t.end()
  })

  test('#add & #offset', function (t) {
    var v = new Vector(1, 1)
    var iv = new IVector(v)
    var iv2 = iv.add(iv)
    t.notOk(iv.equals(iv2), 'result not equal')

    var v3 = new Vector(2, 2)
    var iv3 = new IVector(v3)
    t.ok(iv2.equals(iv3))

    var ov = iv.offset(1, 1)
    t.ok(ov.equals(iv2), 'offset is equivalent to addition')

    t.end()
  })

  test('#distance', function (t) {
    var v = new Vector(-1, -1)
    var iv = new IVector(v)

    t.equal(iv.distance(iv).toSpace(), 0, 'zero distance to self')

    var v2 = new Vector(1, -1)
    var iv2 = new IVector(v2)

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
    var v = new Vector(0, 0)
    var iv = new IVector(v)

    var v2 = new Vector(1, 1)
    var iv2 = new IVector(v2)

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
    var v = new Vector(100, 100)
    var iv = new IVector(v)
    var a = iv.polarOffset(100, 2 * Math.PI)
    var b = iv.polarOffset(100, 0)
    t.ok(a.distance(b).toSpace() < 0.001, 'match')
    t.end()
  })

  test('#polarOffset: allow 0 distance', function (t) {
    var v = new Vector(100, 100)
    var iv = new IVector(v)
    var a = iv.polarOffset(0, Math.PI / 3)
    t.ok(a.equals(iv), 'vectors match')
    t.end()
  })

  test('#polarOffset: allow angles outside [0, 2PI]', function (t) {
    var v = new Vector(100, 100)
    var iv = new IVector(v)
    var a = iv.polarOffset(100, 3 * Math.PI)
    var b = iv.polarOffset(100, Math.PI)
    t.ok(a.distance(b).toSpace() < 0.001, 'match')
    t.end()
  })

  test('#polarOffset: allow IScalar', function (t) {
    var g = new tapspace.SpaceGroup()
    var gg = new tapspace.SpaceGroup(g)
    gg.translate(g.at(0, 0), g.at(2, 2))
    gg.scale(gg.at(0, 0), 2)

    var v = new Vector(1, 1)
    var iv = new IVector(v, gg) // (2+2,2+2) in space

    t.ok(iv.toSpace().equal(new Vector(4, 4)), 'to space')

    var s = new IScalar(3)
    var ivp = iv.polarOffset(s, 0)
    t.ok(ivp.toSpace().equal(new Vector(7, 4)), 'iscalar radius')

    var s0 = new IScalar(3)
    var ivp0 = iv.polarOffset(s0, 0, gg)
    t.ok(ivp0.toSpace().equal(new Vector(7, 4)), 'polarOffset with plane')

    var s2 = new IScalar(3, gg)
    var ivp2 = iv.polarOffset(s2, 0)
    t.ok(ivp2.toSpace().equal(new Vector(10, 4)), 'iscalar with plane')

    var s3 = new IScalar(3, gg)
    var ivp3 = iv.polarOffset(s3, 0, gg)
    t.ok(ivp3.toSpace().equal(new Vector(10, 4)), 'iscalar and offs with plane')

    t.end()
  })
}
