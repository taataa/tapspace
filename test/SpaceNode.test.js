var taaspace = require('../index')

module.exports = function (test) {
  test('#getDescendants: should order correctly', function (t) {
    var space = new taaspace.Space()
    var a = new taaspace.SpacePixel(space)
    var b = new taaspace.SpacePixel(a)
    var c = new taaspace.SpacePixel(b)

    t.deepEqual(a.getChildren(), [b])
    // Order should be from children to children of children.
    t.equal(a.getDescendants()[0], b)
    t.equal(a.getDescendants()[1], c)
    t.deepEqual(c.getDescendants(), [])
    t.end()
  })

  test('#hasDescendant: should travel parent hierarchy', function (t) {
    var space = new taaspace.Space()
    var x = new taaspace.SpacePixel(space)
    var y = new taaspace.SpacePixel(x)
    var z = new taaspace.SpacePixel(space)
    t.ok(space.hasDescendant(y))
    t.notOk(y.hasDescendant(space))
    t.notOk(x.hasDescendant(z))
    t.notOk(x.hasDescendant(x))
    t.end()
  })

  test('#setParent: no cyclic child-parent relationships', function (t) {
    var space = new taaspace.Space()
    var x = new taaspace.SpacePixel(space)

    t.throws(function () {
      x.setParent(x)
    }, /cyclic/i, 'no child of self')

    var y = new taaspace.SpacePixel(x)
    t.throws(function () {
      x.setParent(y)
    }, /cyclic/i, 'child cannot be its own grandparent')

    t.end()
  })
}
