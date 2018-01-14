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
    px1.snap(space.at(0, 0), igrid)
    px2.translate(space.at(0, 0), space.at(2, 0))

    // Positions should match
    var gt1 = px1.getGlobalTransform()
    var gt2 = px2.getGlobalTransform()

    t.ok(gt1.equals(gt2), 'positions should be same')
    t.end()
  })

  test('#snap with pivot', function (t) {
    var space = new taaspace.Space()
    var px1 = new taaspace.SpacePixel(space)
    var px2 = new taaspace.SpacePixel(space)

    // Move both away from same coordinate system with space.
    // This allows us to see problems with correct use of planes.
    px1.translate(space.at(0, 0), space.at(10, 0))
    px2.translate(space.at(0, 0), space.at(10, 0))

    var igrid = new taaspace.InvariantGrid(new taaspace.Grid({
      xStep: 10,
      rotateStep: Math.PI / 2,
      rotatePhase: Math.PI / 4
    }), space)

    // Position the first pixel with a grid and second with a translation.
    px1.snap(px1.at(2, 2), igrid)
    px2.translate(px2.at(2, 2), space.at(10, 2))
    px2.rotate(px2.at(2, 2), Math.PI / 4)

    // Positions should match
    var gt1 = px1.getGlobalTransform()
    var gt2 = px2.getGlobalTransform()

    console.log(gt1, gt2)
    t.ok(gt1.almostEqual(gt2), 'positions should be same')
    t.end()
  })

  test('#snap through node hierarchy', function (t) {
    var ggt, sgt

    var space = new taaspace.Space()
    var g = new taaspace.SpaceGroup(space)
    var gpx = new taaspace.SpacePixel(g) // Note: on group
    var spx = new taaspace.SpacePixel(space) // Note: on space

    // Transform both pixels so that px.atNW()
    // becomes near space.at(-3, -3) with
    // positive x axis toward space origin.

    g.translate(space.at(0, 0), space.at(-10, -10))
    g.rotate(g.at(0, 0), Math.PI / 4)
    gpx.translate(gpx.at(0, 0), gpx.at(10, 0))
    // Mimic
    spx.translate(space.at(0, 0), space.at(-10, -10))
    spx.rotate(spx.at(0, 0), Math.PI / 4)
    spx.translate(spx.at(0, 0), spx.at(10, 0))

    // Assert positions equal
    ggt = gpx.getGlobalTransform()
    sgt = spx.getGlobalTransform()
    t.ok(ggt.almostEqual(sgt), 'assert positions equal')

    // //console.log(gpx.atNW().toSpace().toArray())
    // //
    // var igrid = new taaspace.InvariantGrid({
    //   xStep: 10
    // }, space)
    //
    // gpx.snap(gpx.at(0, 0), igrid)
    // // Mimic
    // spx.translate(spx.at(0, 0), space.at(0, 0))
    //
    // // Assert positions still equal
    // ggt = gpx.getGlobalTransform()
    // sgt = spx.getGlobalTransform()
    // //console.log(ggt._tr, sgt._tr)
    // t.ok(ggt.almostEqual(sgt), 'assert positions equal')

    t.end()
  })
}
