const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:atToNorm', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(0, 0))

    // Get a box. Size is { w: 20, h: 20, d: 0 }
    const box = item.getBoundingBox()

    t.deepEqual(
      box.atToNorm(0, 0, 0),
      { rx: 0, ry: 0, rz: 0 },
      'trivial'
    )
    t.deepEqual(
      box.atToNorm(20, 20, 20),
      { rx: 1, ry: 1, rz: 0 },
      'should handle zero depth'
    )

    t.end()
  })
}
