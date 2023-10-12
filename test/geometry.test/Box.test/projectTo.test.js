const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:projectTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Virtual camera
    const camDist = 300
    const camera = view.at(0, 0, -camDist)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(10, 10, camDist))
    // Get a box. It should be at space (0, 0, 300) and have size (20, 20, 0)
    const box = item.getBoundingBox()

    const projectedBox = box.projectTo(view, camera)

    t.equal(
      projectedBox.getWidth().getNumber(),
      10,
      'box size halved'
    )

    t.equal(
      projectedBox.getDepth().getNumber(),
      0,
      'box has valid zero depth'
    )

    t.almostEqualPoint(
      projectedBox.at(0, 0, 0).changeBasis(space),
      space.at(0, 0, 0),
      'should stay near viewport zero'
    )

    t.end()
  })
}
