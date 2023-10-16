const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBoundingBox()
    const deg45 = Math.PI / 4
    const rotatedBox = box.rotateBy(deg45, box.atNorm(0.5, 0.5))

    // Get boundary
    const bounds = rotatedBox.getBoundingBox()

    t.almostEqual(
      bounds.getWidth().getNumber(),
      20,
      'box size should not grow'
    )

    t.almostEqualPoint(
      bounds.atNorm(0.5, 0.5),
      box.atNorm(0.5, 0.5),
      'box still at same origin'
    )

    // Test custom orientation
    const orientedBounds = rotatedBox.getBoundingBox(space)

    t.almostEqualBox(
      rotatedBox.getBoundingBox(space.getOrientation()),
      orientedBounds,
      'should allow Orientation'
    )

    const size = 20 * Math.sqrt(2)
    const offset = 10 - size / 2

    t.almostEqual(
      orientedBounds.getWidth().getNumber(),
      size,
      'box size should grow'
    )

    t.almostEqualBox(
      orientedBounds.getRaw(),
      { a: 1, b: 0, x: offset, y: offset, z: 0, w: size, h: size, d: 0 },
      'box should be correct'
    )

    t.end()
  })
}
