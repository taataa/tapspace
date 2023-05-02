const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:fromBoxes', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(10, 10))

    const items = []
    items.push(tapspace.createCircle(1, 'black'))
    space.addChild(items[0], space.at(0, 0, 0))
    items.push(tapspace.createCircle(1, 'black'))
    space.addChild(items[1], space.at(2, 2, 2))

    const boxes = items.map(item => item.getBoundingBox())

    // Get the box, represent on item
    const bounds = tapspace.geometry.Box.fromBoxes(view, boxes)

    t.deepEqual(
      bounds.at(0, 0).getRaw(),
      { x: 9, y: 9, z: 0 },
      'should have correct origin'
    )
    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 4, h: 4, d: 2 },
      'should have correct origin'
    )

    t.end()
  })
}
