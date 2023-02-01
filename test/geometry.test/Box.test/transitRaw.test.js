const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:transitRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const boxOnItem = item.getBox()
    const plainBoxOnSpace = boxOnItem.transitRaw(space)

    t.deepEqual(
      plainBoxOnSpace,
      { a: 1, b: 0, x: 0, y: 10, z: 30, w: 20, h: 20, d: 0 },
      'correct box type and position'
    )

    t.end()
  })
}
