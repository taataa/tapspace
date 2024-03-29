const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBoundingBox()
    const scaledBox = box.scaleBy(2, item.atAnchor())

    t.equal(
      scaledBox.getWidth().getNumber(),
      40,
      'box size has doubled'
    )

    t.almostEqualPoint(
      scaledBox.at(0, 0, 0).changeBasis(space),
      space.at(-10, -10, 30),
      'left top corner has moved'
    )

    t.end()
  })
}
