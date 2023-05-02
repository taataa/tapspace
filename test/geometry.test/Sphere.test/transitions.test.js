const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :changeBasis :transitRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20, 20))
    // item zero at 10 10 20

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    const sphereOnItem = sphere.changeBasis(item)

    t.equal(
      sphere.basis,
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
      sphere.transitRaw(item),
      { x: -9, y: -9, z: -19, r: 1 },
      'should transit to item'
    )

    t.end()
  })
}
