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

  test('Component:createDirection', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Take a direction
    const dir = space.createDirection(Math.PI, Math.PI / 2)

    t.almostEqualDirection(
      dir.dir,
      { x: -1, y: 0, z: 0 },
      'should point left'
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
