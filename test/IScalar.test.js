var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('constructor', function (t) {
    t.throws(function () {
      var is = new taaspace.IScalar() // eslint-disable-line
    })
    t.end()
  })

  test('#to', function (t) {
    var space = new taaspace.Space()
    var g = new taaspace.SpaceGroup(space)
    var px = new taaspace.SpacePixel(g)
    px.scale(px.atNW(), 4)

    var is = new taaspace.IScalar(4, px)
    t.equal(is.to(g), 16, 'scalar is scaled')
    t.end()
  })
}
