const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBox()
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
