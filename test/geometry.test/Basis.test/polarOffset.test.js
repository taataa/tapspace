const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:polarOffset', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))
    // Item origin at (10, 10)
    // Item center at (20, 20)

    const geo = tapspace.geometry
    const distance = new geo.Distance(space, 20)
    const direction = new geo.Direction(space, { x: 0, y: 1, z: 0 })
    const basis = item.getBasis().polarOffset(distance, direction)

    t.almostEqualPoint(
      basis.at(0, 0).changeBasis(space),
      space.at(10, 30),
      'should be the same point'
    )

    t.end()
  })
}
