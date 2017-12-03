var taaspace = require('../index')

// Maximal allowed difference due to floating point arithmetic errors
var delta = 0.0001

module.exports = function (test) {

  test('#polarOffset: should allow 0 and 2PI', function (t) {
    var space = new taaspace.Space()
    var p = space.at([100, 100])
    var a = p.polarOffset(100, 2 * Math.PI)
    var b = p.polarOffset(100, 0)
    t.ok(a.xy[0] - b.xy[0] < delta, 'x match')
    t.ok(a.xy[1] - b.xy[1] < delta, 'y match')
    t.end()
  })

  test('#polarOffset: should allow 0 distance', function (t) {
    var space = new taaspace.Space()
    var p = space.at([100, 100])
    var a = p.polarOffset(0, Math.PI / 3)
    t.deepEqual(a.xy, p.xy, 'points match')
    t.end()
  })

  test('#polarOffset: should allow angles outside [0, 2PI]', function (t) {
    var space = new taaspace.Space()
    var p = space.at([100, 100])
    var a = p.polarOffset(100, 2 * Math.PI + 1)
    var b = p.polarOffset(100, 1)
    t.ok(a.xy[0] - b.xy[0] < delta, 'x match')
    t.ok(a.xy[1] - b.xy[1] < delta, 'y match')
    t.end()
  })

}
