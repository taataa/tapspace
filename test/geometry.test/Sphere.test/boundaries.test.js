const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.deepEqual(
      sphere.getBoundingBox().getRaw(),
      { a: 1, b: 0, x: 0, y: 0, z: 0, w: 2, h: 2, d: 2 },
      'should have correct box'
    )

    t.end()
  })
}
