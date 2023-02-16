const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Arc:getLength', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Create an arc, radius 50
    const arc = tapspace.createArc(Math.PI, '1px solid black')
    space.addChild(arc)
    arc.setPoints(space.at(100, 100), space.at(200, 100))

    t.almostEqual(
      arc.getLength().transitRaw(space),
      Math.PI * 50,
      'should have correct arc length'
    )

    t.end()
  })
}
