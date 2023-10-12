const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:rotateByDegrees', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis().rotateByDegrees(180, item.atAnchor())

    t.almostEqualBasis(
      basis.getRaw(),
      { a: -1, b: 0, x: 20, y: 20, z: 0 },
      'should be rotated 180 deg'
    )

    t.end()
  })
}
