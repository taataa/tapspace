var tapspace = require('../../index')
var Vector = tapspace.geom.Vector

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    t.throws(function () {
      var v = new Vector() // eslint-disable-line
    })
    t.end()
  })

  test('.createFromPolar & #almostEqual', function (t) {
    var v = Vector.createFromPolar(1, Math.PI / 2)
    t.ok(v.almostEqual(new Vector(0, 1)))
    t.end()
  })

  test('#add & #equals', function (t) {
    var v = new Vector(1, 1)
    var v2 = v.add(v)
    t.notOk(v.equals(v2), 'result not equal')
    t.ok(v2.equal(new Vector(2, 2)), 'alias')
    t.equal(v2.x, 2, 'x')
    t.equal(v2.y, 2, 'y')

    t.end()
  })

  test('#changeBasis simple', function (t) {
    var v = new Vector(-2, 2)
    var i = new Vector(0, 1)
    var j = new Vector(1, 0)
    var vij = v.changeBasis(i, j)
    t.ok(vij.equals(new Vector(2, -2)), 'new basis')
    t.end()
  })

  test('#changeBasis simple', function (t) {
    var v = new Vector(-1, 2.5)
    var i = new Vector(1, 0.5)
    var j = new Vector(-1, 0.5)
    var vij = v.changeBasis(i, j)
    t.ok(vij.equals(new Vector(2, 3)), 'new basis')
    t.end()
  })

  test('#changeBasis dependent basis', function (t) {
    var v = new Vector(1, 3)
    var i = new Vector(0, 1)
    var j = new Vector(0, 2)

    t.throws(function () {
      v.changeBasis(i, j)
    }, /independent/, 'gives error')

    t.end()
  })

  test('#changeFromBasis', function (t) {
    var v = new Vector(-1, 2.5)
    var i = new Vector(1, 0.5)
    var j = new Vector(-1, 0.5)
    var vij = v.changeBasis(i, j)

    var v2 = vij.changeFromBasis(i, j)
    // Equivalent to
    var v3 = vij.changeBasis(
      (new Vector(1, 0)).changeBasis(i, j),
      (new Vector(0, 1)).changeBasis(i, j)
    )

    t.ok(v.almostEqual(v2), 'equal to original')
    t.ok(v2.almostEqual(v3), 'equal to reference')
    t.ok(v.almostEqual(v3), 'original equal to reference')
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
