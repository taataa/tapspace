const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getBoundingCircle', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const box = item.getBoundingBox()

    // Get circle boundary
    const circle = box.getBoundingCircle()

    t.almostEqualSphere(
      circle.transitRaw(view),
      { x: 10, y: 20, z: 30, r: Math.sqrt(200) },
      'should have larger circle'
    )

    t.end()
  })
}
