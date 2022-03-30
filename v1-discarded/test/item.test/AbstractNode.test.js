var tapspace = require('../../index')

var SpaceGroup = tapspace.SpaceGroup

module.exports = function (test) {
  test('#getDescendants: should order correctly', function (t) {
    var space = new tapspace.Space()
    var a = new tapspace.SpacePixel('black', space)
    var b = new tapspace.SpacePixel('black', a)
    var c = new tapspace.SpacePixel('black', b)

    t.deepEqual(a.getChildren(), [b])
    // Order should be from children to children of children.
    t.equal(a.getDescendants()[0], b)
    t.equal(a.getDescendants()[1], c)
    t.deepEqual(c.getDescendants(), [])
    t.end()
  })

  test('#hasDescendant: should travel parent hierarchy', function (t) {
    var space = new tapspace.Space()
    var x = new tapspace.SpacePixel('black', space)
    var y = new tapspace.SpacePixel('black', x)
    var z = new tapspace.SpacePixel('black', space)
    t.ok(space.hasDescendant(y))
    t.notOk(y.hasDescendant(space))
    t.notOk(x.hasDescendant(z))
    t.notOk(x.hasDescendant(x))
    t.end()
  })

  test('#addChild & #hasChild', function (t) {
    var space = new tapspace.Space()
    var space2 = new tapspace.Space()

    t.throws(function () {
      space.addChild()
    }, 'throw when no parameters')

    var px = new tapspace.SpacePixel('red', space)
    space2.addChild(px)

    t.ok(space2.hasChild(px), 'has child')
    t.notOk(space.hasChild(px), 'no child anymore')
    t.end()
  })

  test('#setParent: no cyclic child-parent relationships', function (t) {
    var space = new tapspace.Space()
    var x = new tapspace.SpacePixel('black', space)

    t.throws(function () {
      x.setParent(x)
    }, /cyclic/i, 'no child of self')

    var y = new tapspace.SpacePixel('black', x)
    t.throws(function () {
      x.setParent(y)
    }, /cyclic/i, 'child cannot be its own grandparent')

    t.end()
  })

  test('get siblings and first and last children', function (t) {
    var g = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var g3 = new SpaceGroup(g)

    t.equal(g.getFirstChild(), g1, 'first')
    t.equal(g.getLastChild(), g3, 'last')
    t.equal(g1.getPreviousSibling(), null, 'null previous')
    t.equal(g1.getNextSibling(), g2, 'next')
    t.equal(g3.getPreviousSibling(), g2, 'previous')
    t.equal(g3.getNextSibling(), null, 'null next')

    t.end()
  })

  test('reorder siblings', function (t) {
    var g = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var g3 = new SpaceGroup(g)
    var g4 = new SpaceGroup(g)

    g.addChild(g3, 0)
    t.deepEqual(g.getChildren(), [g3, g1, g2, g4], 'swap left, g3 to first')

    g1.setParent(g, 2)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'swap right, g2 to third')

    t.end()
  })

  test('#sendBelow & #bringAbove', function (t) {
    var g = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var g3 = new SpaceGroup(g)
    var g4 = new SpaceGroup(g)

    g3.sendBelow(g2)
    t.deepEqual(g.getChildren(), [g1, g3, g2, g4], 'swap left, g2 and g3')

    g1.sendBelow(g4)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'swap right, g1 and g4')

    g2.sendBelow(g2)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'g2 self swap, no change')

    g1.bringAbove(g2)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'no change')

    g4.bringAbove(g3)
    t.deepEqual(g.getChildren(), [g3, g4, g2, g1], 'swap left, g4 to second')

    g4.bringAbove(g1)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'swap right, g4 to last')

    g1.bringAbove(g1)
    t.deepEqual(g.getChildren(), [g3, g2, g1, g4], 'g1 self swap, no change')

    t.end()
  })

  test('#sendToBack & #bringToFront', function (t) {
    var g = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var g3 = new SpaceGroup(g)
    var g4 = new SpaceGroup(g)

    g1.sendToBack()
    t.deepEqual(g.getChildren(), [g1, g2, g3, g4], 'g1 front, no change')

    g4.sendToBack()
    t.deepEqual(g.getChildren(), [g4, g1, g2, g3], 'g4 front')

    g3.bringToFront()
    t.deepEqual(g.getChildren(), [g4, g1, g2, g3], 'g3 back, no change')

    g4.bringToFront()
    t.deepEqual(g.getChildren(), [g1, g2, g3, g4], 'g4 back')

    t.end()
  })

  test('problematic ordering', function (t) {
    var g1 = new SpaceGroup()
    var g2 = new SpaceGroup()

    t.throws(function () {
      g1.bringAbove(g2)
    }, 'cannot sent after root')

    t.throws(function () {
      g1.sendBelow(g2)
    }, 'cannot bring before root')

    t.doesNotThrow(function () {
      g1.bringToFront()
      g2.sendToBack()
    }, 'root is already in place')

    t.end()
  })

  test('ordering with no previous parent', function (t) {
    var g = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var g3 = new SpaceGroup() // no parent yet

    g3.bringAbove(g1)
    t.deepEqual(g.getChildren(), [g1, g3, g2], 'g3 added')

    t.end()
  })

  test('ordering with different parent', function (t) {
    var g = new SpaceGroup()
    var r = new SpaceGroup()
    var g1 = new SpaceGroup(g)
    var g2 = new SpaceGroup(g)
    var r1 = new SpaceGroup(r)

    r1.bringAbove(g2)
    t.deepEqual(g.getChildren(), [g1, g2, r1], 'r1 added')
    t.deepEqual(r.getChildren(), [], 'r empty')

    t.end()
  })
}
