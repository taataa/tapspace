const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis :innerOffset :outerOffset :polarOffset', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(20, 20))
    // Item origin at (10, 10)
    // Item center at (20, 20)

    const itemBasis = item.getBasis()
    const rotBasis = itemBasis.rotateBy(Math.PI / 2)
    const scarotBasis = rotBasis.scaleBy(2)
    // Item basis and tge scaled and rotated basis have origin at (10, 10)

    const innerOffsetBasis = scarotBasis.innerOffset(5, 2, 1)
    // Item x-axis points down and is 2 units long.
    // Item y-axis points left and is 2 units long.
    // Dx of 5 is therefore 10 units long.
    // Dy of 2 is therefore 4 units long.
    // Dz of 1 is therefore 2 units long.
    // Dx' is -Dy is -4 units.
    // Dy' is Dx is 10 units.
    // Dz' is Dz is 2 units.
    // Item origin at (10, 10, 0) in space
    // scarotBasis origin at (10, 10, 0) in space
    t.almostEqualPoint(
      innerOffsetBasis.at(0, 0).changeBasis(space),
      space.at(6, 20, 2),
      'should rotate and scale'
    )

    const outerOffsetBasis = scarotBasis.outerOffset(5, 2, 1)
    // scarotBasis origin at (10, 10, 0) in space
    t.almostEqualPoint(
      outerOffsetBasis.at(0, 0).changeBasis(space),
      space.at(15, 12, 1),
      'should translate in outer basis'
    )

    // Polar offset
    const geo = tapspace.geometry
    const distance = new geo.Distance(space, 20)
    const direction = new geo.Direction(space, { x: 0, y: 1, z: 0 })
    const polarBasis = scarotBasis.polarOffset(distance, direction)
    const rawBasis = scarotBasis.polarOffset(10, 0)

    t.almostEqualPoint(
      polarBasis.at(0, 0).changeBasis(space),
      space.at(10, 30),
      'should do polar offset'
    )
    t.almostEqualPoint(
      rawBasis.at(0, 0).changeBasis(space),
      polarBasis.at(0, 0).changeBasis(space),
      'should match raw'
    )

    t.end()
  })
}
