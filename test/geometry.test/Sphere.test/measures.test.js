const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :getVolume', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.equal(
      sphere.getVolume().getRaw(),
      4 * Math.PI / 3,
      'should have correct volume'
    )

    t.end()
  })
}
