const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:translateBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createItem('hello')
    item.setSize(20, 10)
    item.setAnchor(0, 0)
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBoundingBox()

    t.almostEqualPoint(
      box.translateBy({ x: 1, y: 2, z: 3 }).at(0, 0).transitRaw(view),
      { x: 11, y: 12, z: 33 },
      'should move the corner'
    )

    t.end()
  })
}
