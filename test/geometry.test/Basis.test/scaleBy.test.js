const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis().scaleBy(2, item.atAnchor())

    t.deepEqual(
      basis.getRaw(),
      { a: 2, b: 0, x: -10, y: -10, z: 0 },
      'should be scaled'
    )

    t.end()
  })
}
