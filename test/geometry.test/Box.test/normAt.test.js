const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:normAt', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(0, 0))

    // Get a box. Size is { w: 20, h: 20, d: 0 }
    const box = item.getBoundingBox()

    t.deepEqual(
      box.normAt(0, 0, 0),
      { rx: 0, ry: 0, rz: 0 },
      'trivial'
    )
    t.deepEqual(
      box.normAt(20, 20, 20),
      { rx: 1, ry: 1, rz: 0 },
      'should handle zero depth'
    )

    t.end()
  })
}
