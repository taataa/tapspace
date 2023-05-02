const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:translateBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis().translateBy({ x: 30, y: 30 })

    t.almostEqualPoint(
      basis.at(0, 0).changeBasis(space),
      space.at(40, 40),
      'should be same point'
    )

    t.end()
  })
}
