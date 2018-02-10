var tapspace = require('../../index')
var IScalar = tapspace.geom.IScalar

module.exports = function (test) {
  // Test cases

  test('constructor', function (t) {
    t.throws(function () {
      var is = new IScalar() // eslint-disable-line
    })
    t.end()
  })

  test('#to', function (t) {
    var space = new tapspace.Space()
    var g = new tapspace.SpaceGroup(space)
    var px = new tapspace.SpacePixel('black', g)
    px.scale(px.atNW(), 4)

    var is = new IScalar(4, px)
    t.equal(is.to(g), 16, 'scalar is scaled')
    t.end()
  })
}
