var tapspace = require('../../index')
var Path = tapspace.geom.Path
var Vector = tapspace.geom.Vector

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    var r = new Path() // eslint-disable-line
    t.equal(r.length, 0, 'zero size')
    t.end()
  })

  test('#atMid', function (t) {
    var p = new Path([
      new Vector(0, 0),
      new Vector(0, 2),
      new Vector(2, 2),
      new Vector(2, 0)
    ])
    t.ok(p.atMid().equal(new Vector(1, 1)), 'square mid')

    var q = new Path([
      new Vector(3, 3)
    ])
    t.ok(q.atMid().equal(new Vector(3, 3)), 'single mid')

    var r = new Path([
      new Vector(-1, 0),
      new Vector(1, 0)
    ])
    t.ok(r.atMid().equal(new Vector(0, 0)), 'line')

    t.end()
  })
}
