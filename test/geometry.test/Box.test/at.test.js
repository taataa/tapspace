const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:at', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item)

    // Get a box
    const box = item.getBoundingBox()

    t.almostEqualPoint(
      box.at(10, 10),
      item.at(10, 10),
      'box and item share the basis'
    )

    t.end()
  })
}
