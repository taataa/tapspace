const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Circle :atArc', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    t.almostEqualPoint(
      circle.atArc(Math.PI),
      space.at(0, 1, 1),
      'should match point at left perimeter'
    )

    t.almostEqualPoint(
      circle.atArc(0),
      space.at(2, 1, 1),
      'should match point at right perimeter'
    )

    t.almostEqualPoint(
      circle.atArc(space.createDirection(Math.PI / 2)),
      space.at(1, 2, 1),
      'should handle direction tensor'
    )

    t.end()
  })

  //
  test('Circle :atCenter', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    t.almostEqualPoint(
      circle.atCenter(),
      space.at(1, 1, 1),
      'should match point at center'
    )

    t.end()
  })
}
