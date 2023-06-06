const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
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
      'should match point'
    )

    t.end()
  })
}
