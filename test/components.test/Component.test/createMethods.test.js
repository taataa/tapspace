const template = require('./template.ejs')

module.exports = (test, container, tapspace) => {
  //
  test('Component:createBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    t.almostEqualBasis(
      space.createBasis(space.at(0, 0), 1, 0),
      space.getBasis(),
      'should be identical with space basis'
    )

    t.end()
  })

  test('Component:createOrientation', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    t.almostEqualOrientation(
      space.createOrientation(Math.PI).getRaw(),
      { a: -1, b: 0 },
      'should be upside down'
    )

    t.end()
  })
}