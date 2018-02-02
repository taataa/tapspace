var taaspace = require('../../index')

module.exports = function (test) {
  test('#getDescendants: should order correctly', function (t) {
    var space = new taaspace.Space()
    var a = new taaspace.SpacePixel('black', space)
    var b = new taaspace.SpacePixel('black', a)
    var c = new taaspace.SpacePixel('black', b)

    t.deepEqual(a.getChildren(), [b])
    // Order should be from children to children of children.
    t.equal(a.getDescendants()[0], b)
    t.equal(a.getDescendants()[1], c)
    t.deepEqual(c.getDescendants(), [])
    t.end()
  })

  test('#hasDescendant: should travel parent hierarchy', function (t) {
    var space = new taaspace.Space()
    var x = new taaspace.SpacePixel('black', space)
    var y = new taaspace.SpacePixel('black', x)
    var z = new taaspace.SpacePixel('black', space)
    t.ok(space.hasDescendant(y))
    t.notOk(y.hasDescendant(space))
    t.notOk(x.hasDescendant(z))
    t.notOk(x.hasDescendant(x))
    t.end()
  })

  test('#addChild & #hasChild', function (t) {
    var space = new taaspace.Space()
    var space2 = new taaspace.Space()

    t.throws(function () {
      space.addChild()
    }, 'throw when no parameters')

    var px = new taaspace.SpacePixel('red', space)
    space2.addChild(px)

    t.ok(space2.hasChild(px), 'has child')
    t.notOk(space.hasChild(px), 'no child anymore')
    t.end()
  })

  test('#setParent: no cyclic child-parent relationships', function (t) {
    var space = new taaspace.Space()
    var x = new taaspace.SpacePixel('black', space)

    t.throws(function () {
      x.setParent(x)
    }, /cyclic/i, 'no child of self')

    var y = new taaspace.SpacePixel('black', x)
    t.throws(function () {
      x.setParent(y)
    }, /cyclic/i, 'child cannot be its own grandparent')

    t.end()
  })
}
