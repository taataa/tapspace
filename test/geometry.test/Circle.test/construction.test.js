const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  const Circle = tapspace.geometry.Circle

  test('Circle :fromPoints', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Extreme case: halved cube
    const points = [
      space.at(0, 0, 0),
      space.at(0, 0, 1), // z should not matter
      space.at(0, 1, 0),
      space.at(1, 0, 0)
    ]

    t.deepEqual(
      Circle.fromPoints(space, points).getRaw(),
      { x: 0.5, y: 0.5, z: 0, r: Math.sqrt(2) / 2 },
      'should be centered to bounding box'
    )

    t.end()
  })
}
