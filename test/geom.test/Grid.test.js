var tapspace = require('../../index')
var Transform = tapspace.geom.Transform
var Vector = tapspace.geom.Vector
var Grid = tapspace.geom.Grid
var Path = tapspace.geom.Path

module.exports = function (test) {
  // Test cases

  test('constructor when no parameters', function (t) {
    var gr = new Grid()
    t.equal(gr.mode.scaleStep, 0, 'default scale step')
    t.end()
  })

  test('#at basic', function (t) {
    var grid = new Grid({
      xStep: -1,
      yStep: -1,
      xPhase: 1,
      yPhase: 1
    })
    t.ok(grid.at(0, 0).almostEqual(new Vector(1, 1)), 'origin')
    t.ok(grid.at(1, 1).almostEqual(new Vector(0, 0)), 'first')
    t.ok(grid.at(0, 0).equal(grid.getOrigin()), 'equal origin')
    t.end()
  })

  test('#at gridless', function (t) {
    var grid = new Grid()
    t.ok(grid.at(0, 0).almostEqual(new Vector(0, 0)), 'origin')
    t.ok(grid.at(2, -145).almostEqual(new Vector(0, 0)), 'always origin')
    t.end()
  })

  test('#snap translate', function (t) {
    var tr = Transform.IDENTITY.translateBy(15, 5)
    var grid = new Grid({
      xStep: 10,
      yStep: 10,
      xPhase: 2,
      yPhase: 0
    })
    var pivot = new Vector(0, 0)
    var snapped = grid.snap(pivot, tr)

    t.equal(snapped.tx, 12, 'tx')
    t.equal(snapped.ty, 10, 'ty')

    var pivot2 = new Vector(8, 8)
    // tr maps pivot to (23, 13)
    // nearest point on grid is (22, 10)
    // Therefore a translation of (-1, -3) is required to snap.
    var snapped2 = grid.snap(pivot2, tr)

    t.equal(snapped2.tx, 14, 'tx pivot 8 8')
    t.equal(snapped2.ty, 2, 'ty pivot 8 8')

    t.end()
  })

  test('#snap with pivot', function (t) {
    // Remain same with pivot 0 0
    var gr = new Grid({
      rotateStep: Math.PI / 4,
      rotatePhase: 0
    })
    var pivot = new Vector(0, 0)
    var deg45 = Transform.IDENTITY.rotateBy(Math.PI / 4)
    var snapped = gr.snap(pivot, deg45)
    t.ok(snapped.equals(deg45), 'stay same, pivot 0 0')

    // Snap to closest
    var deg36 = Transform.IDENTITY.rotateBy(Math.PI / 5)
    var snapped2 = gr.snap(pivot, deg36)
    t.ok(snapped2.almostEqual(deg45), 'back to deg45, pivot 0 0')

    // Remain same with pivot 1 1
    var pivot2 = new Vector(1, 1)
    var snapped3 = gr.snap(pivot2, deg45)
    t.ok(snapped3.equals(deg45), 'stay same, pivot 1 1')

    // Snap to closest with pivot 1 1
    var snapped4 = gr.snap(pivot2, deg36)
    t.notOk(snapped4.equals(deg45), 'translation should change')
    t.equal(snapped4.getRotation(), Math.PI / 4, 'rotation snapped')

    t.end()
  })

  test('#snap scale', function (t) {
    var tr = Transform.IDENTITY.scaleBy(3.2)
    var grid = new Grid({
      scaleStep: 1,
      scalePhase: 0.5
    })
    var pivot = new Vector(0, 0)
    var snapped = grid.snap(pivot, tr)

    t.equal(snapped.getScale(), 3.5, 'snapped scale')
    t.equal(snapped.getRotation(), 0, 'zero rotation')
    t.ok(pivot.transform(tr).equals(pivot.transform(snapped)),
      'pivot stay still')

    // With non-origin pivot
    var pivot2 = new Vector(1, 1)
    var snapped2 = grid.snap(pivot2, tr)

    t.ok(pivot2.transform(tr).equals(pivot2.transform(snapped2)),
      'pivot2 stay still')
    t.notOk(tr.equals(snapped2), 'transformations not same')

    t.end()
  })

  test('#snap rotate', function (t) {
    var grid = new Grid({
      rotateStep: Math.PI
    })
    var pivot = new Vector(0, 0)
    var tr = Transform.IDENTITY.rotateBy(Math.PI * 1.8)
    var snapped = grid.snap(pivot, tr)

    t.ok(snapped.getRotation() < Transform.EPSILON, 'full turn')

    t.end()
  })

  test('#snap xRotation', function (t) {
    // Let us build a grid where allowed x values go at 45 degree angle.
    //
    //     | o         o         o
    //     |o         o         o
    //   --o----->   o         o
    //    o|        o         o
    //   o |       o         o
    //  o  V      o         o
    //
    var grid = new Grid({
      xStep: 10,
      xRotation: Math.PI / 4,
      yStep: 10
    })
    var pivot = new Vector(0, 0)
    var tr = Transform.IDENTITY.translateBy(4, 0)

    var snapped = grid.snap(pivot, tr)

    var r2 = Math.sqrt(2)
    var tr2 = Transform.IDENTITY.translateBy(5 * r2, 5 * r2) // (7.07, 7.07)
    t.ok(snapped.almostEqual(tr2), 'snapped to nearest')
    t.end()
  })

  test('#transform scaling', function (t) {
    var gr1 = new Grid({
      xStep: 10,
      yStep: 1
    })

    var gr2 = new Grid({
      xStep: 20,
      yStep: 2
    })

    var gr1X2 = gr1.transform(Transform.X2)

    t.ok(gr1X2.equal(gr2), 'grid scaled')
    t.end()
  })

  test('#transform translation with pivot', function (t) {
    var gr1 = new Grid({
      xStep: 1,
      yStep: 10,
      yPhase: 5
    })

    var gr2 = new Grid({
      xStep: 1,
      yStep: 10,
      yPhase: 8
    })

    var tr = Transform.IDENTITY.translateBy(0, 3)
    var gr1tr = gr1.transform(tr)

    t.ok(gr1tr.almostEqual(gr2), 'grid translated')
    t.end()
  })

  test('#getHullOf simple grid', function (t) {
    var grid = new Grid({
      xStep: 1,
      yStep: 1
    })

    var hull00 = grid.getHullOf(0, 0)
    var path00 = new Path([
      new Vector(0, 0),
      new Vector(0, 1),
      new Vector(1, 1),
      new Vector(1, 0)
    ])

    t.ok(hull00.almostEqual(path00))

    var hull99 = grid.getHullOf(9, 9)
    var path99 = new Path([
      new Vector(9, 9),
      new Vector(9, 10),
      new Vector(10, 10),
      new Vector(10, 9)
    ])
    t.ok(hull99.almostEqual(path99))

    t.end()
  })

  test('#getHullOf complex grid', function (t) {
    // See docs/notes/2018-01-15-21
    var grid = new Grid({
      xStep: 8,
      yStep: 4,
      xPhase: 2,
      yPhase: 2,
      xRotation: Math.PI / 2,
      yRotation: Math.PI
    })

    var hull = grid.getHullOf(-1, -1)
    var path = new Path([
      new Vector(-2, -6),
      new Vector(-2, 2),
      new Vector(2, 2),
      new Vector(2, -6)
    ])

    t.ok(hull.almostEqual(path))
    t.end()
  })
}
