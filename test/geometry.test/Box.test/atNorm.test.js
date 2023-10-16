const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:atNorm', (t) => {
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
      box.atNorm(1, 1, 1),
      item.at(20, 20, 0),
      'same back bottom right corner'
    )

    t.end()
  })
}
