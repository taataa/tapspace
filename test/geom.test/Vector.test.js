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

  test('#rotate', (t) => {
    var v = new Vector(2, 0)
    // Around default pivot, origin
    var r = v.rotate(Math.PI)
    t.ok(r.x > -2.1 && r.x < -1.9, 'half turn x: ' + r.x)
    t.ok(r.y > -0.1 && r.y < 0.1, 'half turn y: ' + r.y)
    // Quarter turn
    var q = v.rotate(-Math.PI / 2)
    t.ok(q.x > -0.1 && q.x < 0.1, 'quarter x: ' + q.x)
    t.ok(q.y > -2.1 && q.y < -1.9, 'quarter y: ' + q.y)
    // Quarter turn around given pivot
    var p = new Vector(2, 2)
    var pr = v.rotate(Math.PI / 2, p)
    t.ok(pr.x > 3.9 && pr.x < 4.1, 'quarter around pivot x: ' + pr.x)
    t.ok(pr.y > 1.9 && pr.y < 2.1, 'quarter around pivot y: ' + pr.y)

    t.end()
  })
}
