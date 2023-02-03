const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:rotateBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createItem('hello')
    item.setSize(20, 10)
    item.setAnchor(0, 0)
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBox()

    // Flip around corner
    const rotated = box.rotateBy(Math.PI, item.atBottomRight())

    t.almostEqualPoint(
      rotated.at(0, 0).transitRaw(view),
      { x: 50, y: 30, z: 30 },
      'the corner should be far'
    )

    t.end()
  })
}
