const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:rotateBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis().rotateBy(Math.PI, item.atAnchor())

    t.almostEqualBasis(
      basis.getRaw(),
      { a: -1, b: 0, x: 20, y: 20, z: 0 },
      'should be rotated'
    )

    t.end()
  })
}
