const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(10, 20))
    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(30, 40))
    // item (0,0) at space (20, 30)

    // Create a Point
    const p = item.at(10, 6)

    t.deepEqual(
      p.transitRaw(space),
      { x: 30, y: 36, z: 0 },
      'ensure transitRaw behavior'
    )

    t.deepEqual(
      p.transitRawOuter(space),
      { x: 40, y: 56, z: 0 },
      'should transit to hyperspace'
    )

    t.end()
  })
}
