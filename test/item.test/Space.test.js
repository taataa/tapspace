var taaspace = require('../../index')

module.exports = function (test) {
  test('cannot have parent', function (t) {
    var sp1 = new taaspace.Space()
    var sp2 = new taaspace.Space()

    t.throws(function () {
      sp2.setParent(sp1)
    }, /parent/, 'space cannot be parent of another space')

    t.notOk(sp1.hasChild(sp2))

    t.doesNotThrow(function () {
      sp2.remove()
    }, 'cannot be removed from any parent')

    t.end()
  })

  test('#getHull', function (t) {
    var sp = new taaspace.Space()
    t.equal(sp.getHull().length, 1, 'empty hull has 0 0')

    var px = new taaspace.SpacePixel(sp)

    t.equal(sp.getHull().length, 4, 'space hull not null')
    t.ok(sp.getHull().equals(px.getHull()), 'hulls are equal')

    t.end()
  })
}
