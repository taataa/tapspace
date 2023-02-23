const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:resizeTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('hello')
    item.setSize(20, 10)
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBoundingBox()

    t.deepEqual(
      box.getSize().transitRaw(view),
      { w: 20, h: 10, d: 0 },
      'should have correct initial size'
    )
    t.deepEqual(
      box.at(0, 0).transitRaw(view),
      { x: 10, y: 10, z: 30 },
      'should have correct initial position'
    )

    const nextSize = { w: 40, h: 40, d: 10 }
    const resizedBox = box.resizeTo(nextSize, box.atNorm(0.5, 0.5))

    t.deepEqual(
      resizedBox.getSize().transitRaw(view),
      { w: 40, h: 40, d: 10 },
      'should have new size'
    )

    t.deepEqual(
      resizedBox.at(0, 0).transitRaw(view),
      { x: 0, y: -5, z: 30 },
      'should be translated'
    )

    t.end()
  })
}
