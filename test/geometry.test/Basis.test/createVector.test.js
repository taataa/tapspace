const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis :createVector', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20, 20))

    const itemBasis = item.getBasis()

    t.almostEqualVector(
      itemBasis.createVector(10, 20).transitRaw(space),
      { x: 10, y: 20, z: 0 },
      'should not be affected on basis translation'
    )

    t.end()
  })
}
