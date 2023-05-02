const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:changeBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis()

    t.almostEqualPoint(
      basis.changeBasis(space).at(0, 0),
      space.at(10, 10),
      'should be same point'
    )

    t.end()
  })
}
