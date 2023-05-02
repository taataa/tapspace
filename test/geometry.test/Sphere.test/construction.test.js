const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  const Sphere = tapspace.geometry.Sphere

  test('Sphere :fromPoints', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Extreme case: halved cube
    const points = [
      space.at(0, 0, 0),
      space.at(0, 0, 1),
      space.at(0, 1, 0),
      space.at(1, 0, 0)
    ]

    t.deepEqual(
      Sphere.fromPoints(space, points).getRaw(),
      { x: 0.5, y: 0.5, z: 0.5, r: Math.sqrt(3) / 2 },
      'should be centered to bounding box'
    )

    t.end()
  })
}
