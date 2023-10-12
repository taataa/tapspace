const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:changeBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const boxOnItem = item.getBoundingBox()
    const boxOnSpace = boxOnItem.changeBasis(space)

    t.almostEqualPoint(
      boxOnItem.at(10, 10, 20).transitRaw(view),
      boxOnSpace.at(10, 10, 20).transitRaw(view),
      'same box'
    )

    t.notEqual(
      boxOnItem.basis,
      boxOnSpace.basis,
      'different basis'
    )

    t.end()
  })
}
