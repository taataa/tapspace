var taaspace = require('../index')
var Transform = taaspace.Transform
var Grid = taaspace.Grid

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    var gr = new Grid()
    t.equal(gr.mode.scale, 0, 'default scale step')
    t.end()
  })

  test('#snap translate', function (t) {
    var tr = Transform.IDENTITY.translateBy(15, 5)
    var gr = new Grid({
      translate: 10
    })
    var snapped = gr.snap(tr)

    t.equal(snapped.tx, 20, 'tx')
    t.equal(snapped.ty, 10, 'ty')

    t.end()
  })

  test('#snap rotate', function (t) {
    var tr = Transform.IDENTITY.rotateBy(Math.PI * 1.8)
    var gr = new Grid({
      rotate: Math.PI
    })
    var snapped = gr.snap(tr)

    t.equal(snapped.getRotation(), 0, 'rotation')

    t.end()
  })
}
