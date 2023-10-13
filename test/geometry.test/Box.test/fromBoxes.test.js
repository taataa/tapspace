const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  const Box = tapspace.geometry.Box

  test('Box:fromBoxes', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(10, 10))

    const items = []
    items.push(tapspace.createNode(1, 'black'))
    space.addChild(items[0], space.at(0, 0, 0))
    items.push(tapspace.createNode(1, 'black'))
    space.addChild(items[1], space.at(2, 2, 2))

    const boxes = items.map(item => item.getBoundingBox())

    // Get the box, represent on viewport
    const bounds = Box.fromBoxes(view, boxes)

    t.deepEqual(
      bounds.at(0, 0).getRaw(),
      { x: 9, y: 9, z: 0 },
      'should have correct origin'
    )
    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 4, h: 4, d: 2 },
      'should have correct origin'
    )

    // Get bounding box on custom basis
    const scale = 1
    const angle = Math.PI / 4 // 45 deg
    const basis = space.createBasis({ x: 0, y: 0 }, scale, angle)
    const orientation = basis.getOrientation()

    const orientedBoxes = items.map(item => item.getBoundingBox(orientation))
    const orientedBounds = Box.fromBoxes(basis, orientedBoxes)

    t.almostEqualPoint(
      orientedBounds.atNorm(0, 0).getRaw(),
      { x: 0, y: -Math.SQRT2, z: 0 },
      'should have correct oriented origin'
    )
    t.deepEqual(
      orientedBounds.atNorm(1, 1).getRaw(),
      { x: 2, y: 2 + Math.SQRT2, z: 0 },
      'should have correct oriented corner'
    )

    t.end()
  })
}
