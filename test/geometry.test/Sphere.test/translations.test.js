const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :translateBy :offset :getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.deepEqual(
      sphere.translateBy({ x: 1, y: 1, z: 1 }).getRaw(),
      { x: 2, y: 2, z: 2, r: 1 },
      'should translate'
    )

    t.deepEqual(
      sphere.offset(1, 1, 1).getRaw(),
      { x: 2, y: 2, z: 2, r: 1 },
      'should offset'
    )

    t.end()
  })
}
