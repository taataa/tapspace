var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('#snap', function (t) {
    var space = new taaspace.Space()
    var px1 = new taaspace.SpacePixel(space)
    var px2 = new taaspace.SpacePixel(space)

    var igrid = new taaspace.InvariantGrid(new taaspace.Grid({
      xStep: 10,
      xPhase: 2
    }), space)

    // Position the first pixel with a grid and second with a translation.
    px1.snap(igrid)
    px2.translate(space.at(0, 0), space.at(2, 0))

    // Positions should match
    var gt1 = px1.getGlobalTransform()
    var gt2 = px2.getGlobalTransform()

    t.ok(gt1.equals(gt2), 'positions should be same')
    t.end()
  })
}
