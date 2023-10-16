const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:at', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createNode(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis()

    t.almostEqualPoint(
      basis.at(0, 0).changeBasis(space),
      space.at(10, 10),
      'should be same point'
    )

    t.end()
  })
}
