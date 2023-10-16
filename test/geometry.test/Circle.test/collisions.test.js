const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Circle :detectCollision', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    t.true(
      circle.detectCollision(space.at(1, 1, 1)),
      'point should hit circle inside'
    )
    t.true(
      circle.detectCollision(space.at(1, 0, 1)),
      'point should hit circle surface'
    )
    t.false(
      circle.detectCollision(space.at(0, 0, 0)),
      'point should be outside the circle'
    )

    t.throws(() => {
      circle.detectCollision(space.createVector(1, 0, 0))
    }, 'should detect unsupported geometry')

    const plainn = { x: 3, y: 1, z: 1, r: 1 }
    const circlee = new tapspace.geometry.Circle(view, plainn)

    t.true(
      circle.detectCollision(circlee),
      'circles should touch'
    )

    const plainnn = { x: 4, y: 1, z: 1, r: 1 }
    const circleee = new tapspace.geometry.Circle(view, plainnn)
    t.false(
      circle.detectCollision(circleee),
      'circles should not touch'
    )

    // Test getCollisionArea
    t.equal(
      circle.getCollisionArea(circlee).getRaw(),
      0,
      'circles should not overlap'
    )

    t.end()
  })
}
