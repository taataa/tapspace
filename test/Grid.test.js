var taaspace = require('../index')
var Transform = taaspace.Transform
var Grid = taaspace.Grid

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    var gr = new Grid()
    t.equal(gr.mode.scaleStep, 0, 'default scale step')
    t.end()
  })

  test('#snap translate', function (t) {
    var tr = Transform.IDENTITY.translateBy(15, 5)
    var gr = new Grid({
      xStep: 10,
      yStep: 10,
      xPhase: 2,
      yPhase: 0
    })
    var snapped = gr.snap(tr)

    t.equal(snapped.tx, 12, 'tx')
    t.equal(snapped.ty, 10, 'ty')

    t.end()
  })

  test('#snap scale', function (t) {
    var tr = Transform.IDENTITY.scaleBy(3.2)
    var gr = new Grid({
      scaleStep: 1,
      scalePhase: 0.5
    })
    var snapped = gr.snap(tr)

    t.equal(snapped.getScale(), 3.5, 'snapped scale')
    t.equal(snapped.getRotation(), 0, 'zero rotation')
    t.equal(snapped.tx, 0, 'zero tx')

    t.end()
  })

  test('#snap rotate', function (t) {
    var tr = Transform.IDENTITY.rotateBy(Math.PI * 1.8)
    var gr = new Grid({
      rotateStep: Math.PI
    })
    var snapped = gr.snap(tr)

    t.equal(snapped.getRotation(), 0, 'full turn')

    t.end()
  })

}
