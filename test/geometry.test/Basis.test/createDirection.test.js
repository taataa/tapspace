const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis :createDirection', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    space.rotateBy(Math.PI / 2)

    const spaceBasis = space.getBasis()

    t.almostEqualDirection(
      spaceBasis.createDirection(Math.PI / 2).transitRaw(view),
      { x: -1, y: 0, z: 0 },
      'should handle default phi'
    )

    t.almostEqualDirection(
      spaceBasis.createDirection(Math.PI / 2, 0).transitRaw(view),
      { x: 0, y: 0, z: 1 },
      'should handle zero phi'
    )

    t.end()
  })
}
