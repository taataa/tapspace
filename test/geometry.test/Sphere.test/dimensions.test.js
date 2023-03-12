const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :getSize :getDiameter :getRadius :getDepth', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.deepEqual(
      sphere.getSize().getRaw(),
      { w: 2, h: 2, d: 2 },
      'should have correct size'
    )

    t.deepEqual(
      sphere.getDiameter().getRaw(),
      2,
      'should have correct diameter'
    )

    t.deepEqual(
      sphere.getRadius().getRaw(),
      1,
      'should have correct radius'
    )

    t.deepEqual(
      sphere.getWidth().getRaw(),
      2,
      'should have correct width'
    )

    t.deepEqual(
      sphere.getHeight().getRaw(),
      2,
      'should have correct height'
    )

    t.deepEqual(
      sphere.getDepth().getRaw(),
      2,
      'should have correct depth'
    )

    t.end()
  })
}
