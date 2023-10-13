const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Space:getDirection', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    // Take a direction
    const dir = basis.getDirection(Math.PI, Math.PI / 2)

    t.almostEqualVector(
      dir.dir, // TODO impl almostEqualDirection
      { x: -1, y: 0, z: 0 },
      'should point left'
    )

    t.end()
  })
}
