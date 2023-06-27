const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getBoundingSphere', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const box = item.getBoundingBox()

    // Get spherical boundary
    const sphere = box.getBoundingCircle()

    t.almostEqualSphere(
      sphere.transitRaw(view),
      { x: 10, y: 20, z: 30, r: Math.sqrt(200) },
      'should have larger sphere'
    )

    t.end()
  })
}
