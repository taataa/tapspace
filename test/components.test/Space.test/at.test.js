const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Space:at', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Take a point
    const p = space.at(1, 2)

    t.almostEqualPoint(
      p,
      { basis: space, point: { x: 1, y: 2, z: 0 } },
      'should fill z'
    )

    t.end()
  })
}
