const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Circle :getSize :getDiameter :getRadius', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    t.deepEqual(
      circle.getSize().getRaw(),
      { w: 2, h: 2, d: 0 },
      'should have correct size'
    )

    t.deepEqual(
      circle.getDiameter().getRaw(),
      2,
      'should have correct diameter'
    )

    t.deepEqual(
      circle.getRadius().getRaw(),
      1,
      'should have correct radius'
    )

    t.deepEqual(
      circle.getWidth().getRaw(),
      2,
      'should have correct width'
    )

    t.deepEqual(
      circle.getHeight().getRaw(),
      2,
      'should have correct height'
    )

    t.end()
  })

  test('Circle :getArea', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    t.equal(
      circle.getArea().getRaw(),
      Math.PI, // πr²
      'should have correct area'
    )

    t.end()
  })
}
