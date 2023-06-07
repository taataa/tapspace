const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.deepEqual(
      sphere.scaleBy(2).getRaw(),
      { x: 1, y: 1, z: 1, r: 2 },
      'should scale around center'
    )

    t.deepEqual(
      sphere.scaleBy(2, space.at(0, 0, 0)).getRaw(),
      { x: 2, y: 2, z: 2, r: 2 },
      'should scale around space origin'
    )

    t.end()
  })

  // TODO rotateAroundLine
  // TODO rotateBy
}
