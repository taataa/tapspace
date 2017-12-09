var taaspace = require('../index')

module.exports = function (test) {
  test('#switchTo: preserve equivalence', function (t) {
    var space = new taaspace.Space()
    var px = new taaspace.SpacePixel(space)

    // Identity transformation
    var tr = new taaspace.SpaceTransform(space)

    // Move away from trivial 0,0
    px.translate(space.at([-10, -10]), space.at([10, 10]))

    // Represent the identity transform on spacepixel
    var pxtr = tr.switchTo(px)

    t.ok(pxtr.equals(tr), 'switchTo preserves equivalence')
    t.end()
  })

  test('#equals: should detect small difference', function (t) {
    var space = new taaspace.Space()
    var t1 = new taaspace.Transform(1.0, 2.0, 3.0, 4.0)
    var t2 = new taaspace.Transform(1.0, 2.0, 3.0, 4.01)
    var st1 = new taaspace.SpaceTransform(space, t1)
    var st2 = new taaspace.SpaceTransform(space, t2)
    t.notOk(st1.equals(st2), 'small difference')
    t.end()
  })

  test('#inverse: should return true inverse', function (t) {
    // Note: a subset of transform parameters produce
    // floating point rounding errors that cause the test to fail.
    // One example is (1.0, 2.0, 3.0, 4.0)
    var space = new taaspace.Space()
    var tr = new taaspace.Transform(1.0, 1.0, 1.0, 1.0)
    var st = new taaspace.SpaceTransform(space, tr)
    var id = st.transformBy(st.inverse())
    var identity = new taaspace.SpaceTransform(space)
    // TODO equals with tolerance
    t.ok(id.equals(identity), 'is identity transform')
    t.end()
  })

  test('#to: should convert simple translation', function (t) {
    var space = new taaspace.Space()
    var txt = new taaspace.SpaceHTML(space, '')
    txt.scale(space.at([0, 0]), 2.0)
    // On txt, 1 unit equals to 2 space units.
    var tr = taaspace.Transform.IDENTITY.translateBy(1, 1)
    var st = new taaspace.SpaceTransform(txt, tr)
    // Convert +1,+1 translation onto space. It becomes +2,+2 translation
    var stOnSpace = st.to(space)
    t.deepEqual(stOnSpace.T.transform([1, 1]), [3, 3], 'transformed correctly')
    t.end()
  })

  test('#transformBy: should take another SpaceTransform', function (t) {
    var space = new taaspace.Space()
    // Create scaling transformation
    var s = new taaspace.SpaceTransform(space).scale(space.at([0, 0]), 2)
    // Create stronger scaling
    var s2 = s.transformBy(s)

    var px = new taaspace.SpacePixel(space)
    t.deepEqual(px.atSE().to(space).xy, [1, 1])

    px.transformBy(s2)
    t.deepEqual(px.atNW().to(space).xy, [0, 0])
    t.deepEqual(px.atSE().to(space).xy, [4, 4])
    t.end()
  })
}
