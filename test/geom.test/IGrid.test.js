var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceGroup = tapspace.SpaceGroup
var SpacePixel = tapspace.SpacePixel
var Grid = tapspace.geom.Grid
var IGrid = tapspace.geom.IGrid

module.exports = function (test) {
  // Test cases

  test('#at', function (t) {
    var space = new Space()
    var igrid = new IGrid({
      xStep: 1,
      yStep: 1
    }) // note: default plane is Space
    t.ok(igrid.at(3, 3).almostEqual(space.at(3, 3)))
    t.end()
  })

  test('#snap', function (t) {
    var space = new Space()
    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', space)

    var igrid = new IGrid(new Grid({
      xStep: 10,
      xPhase: 2,
      yStep: 100
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
    var space = new Space()
    var px1 = new SpacePixel('black', space)
    var px2 = new SpacePixel('black', space)

    // Move both away from the same coordinate system with the space.
    // This allows us to see problems with correct use of planes.
    px1.translate(space.at(0, 0), space.at(10, 0))
    px2.translate(space.at(0, 0), space.at(10, 0))

    var igrid = new IGrid(new Grid({
      xStep: 10,
      yStep: 10,
      rotateStep: Math.PI / 2,
      rotatePhase: Math.PI / 4
    }), space)

    // Position the first pixel with a grid.
    px1.snap(px1.at(2, 2), igrid)
    // And second with a good ol' translation
    px2.translate(px2.at(2, 2), space.at(10, 0))
    px2.rotate(px2.at(2, 2), Math.PI / 4)

    // Positions should match
    var gt1 = px1.getGlobalTransform()
    var gt2 = px2.getGlobalTransform()

    t.ok(gt1.almostEqual(gt2), 'positions should be same')
    t.end()
  })

  test('#snap through node hierarchy', function (t) {
    var ggt, sgt

    var space = new Space()
    var g = new SpaceGroup(space)
    var gpx = new SpacePixel('black', g) // Note: on group
    var spx = new SpacePixel('black', space) // Note: on space

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

    var igrid = new IGrid({
      xStep: 10,
      yStep: 20
    }, space)

    gpx.snap(gpx.at(0, 0), igrid)
    // Mimic
    spx.translate(spx.at(0, 0), space.at(0, 0))

    // Assert positions still equal
    ggt = gpx.getGlobalTransform()
    sgt = spx.getGlobalTransform()
    t.ok(ggt.almostEqual(sgt), 'assert positions equal')

    t.end()
  })

  test('#getHullOf', function (t) {
    var space = new Space()
    var g = new SpaceGroup(space)
    g.scale(g.at(0, 0), 2)
    var igrid = new IGrid({
      xStep: 1,
      yStep: 1
    }, g)
    var igrid2 = new IGrid({
      xStep: 2,
      yStep: 2
    })
    var hull = igrid.getHullOf(1, 1).toSpace()
    var hull2 = igrid2.getHullOf(1, 1).toSpace()

    t.ok(hull.almostEqual(hull2))
    t.end()
  })
}
