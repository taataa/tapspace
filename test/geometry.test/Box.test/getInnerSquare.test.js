const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getInnerSquare', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('hello')
    item.setSize(20, 10)
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const box = item.getBoundingBox()
    // Inner square 10x10
    const square = box.getInnerSquare()

    // Test position
    t.almostEqualPoint(
      square.atNorm(0.5, 0).changeBasis(view),
      box.atNorm(0.5, 0).changeBasis(view),
      'should have matching top center'
    )

    // Test area
    const area = square.getArea()
    t.deepEqual(area.transitRaw(view), 100, 'should be correct area')

    t.end()
  })
}
