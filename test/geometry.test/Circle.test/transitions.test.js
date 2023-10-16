const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Circle :changeBasis :transitRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(20, 20, 20))
    // item zero at 10 10 20

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const circle = new tapspace.geometry.Circle(space, plain)

    const sphereOnItem = circle.changeBasis(item)

    t.equal(
      circle.basis,
      space,
      'should still have old basis'
    )

    t.equal(
      sphereOnItem.basis,
      item,
      'should have new basis'
    )

    t.almostEqualPoint(
      sphereOnItem.atCenter().getRaw(),
      { x: -9, y: -9, z: -19 },
      'should be relative to item'
    )

    t.deepEqual(
      circle.transitRaw(item),
      { x: -9, y: -9, z: -19, r: 1 },
      'should transit to item'
    )

    t.end()
  })
}
