const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Space:getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Create items for boundary
    const foo = tapspace.createItem('<p>Foo</p>')
    foo.setSize(200, 200)
    foo.setAnchor(0, 0)
    const bar = tapspace.createItem('<p>Bar</p>')
    bar.setSize(200, 200)
    bar.setAnchor(0, 0)

    // Try to add off the space
    space.addChild(foo, space.at(100, 100, 10))
    space.addChild(bar, space.at(500, 300, -10))

    // Take the box
    const bounds = space.getBoundingBox()

    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 600, h: 400, d: 20 },
      'should have correct size'
    )

    // Take a custom orientation.
    const orient = space.createOrientation(Math.PI / 4)
    const orientedBounds = space.getBoundingBox(orient)

    t.almostEqualPoint(
      orientedBounds.at(0, 0).changeBasis(space),
      space.at(300, -100, -10),
      'should have matching origin'
    )

    t.almostEqualPoint(
      orientedBounds.atNorm(1, 1).changeBasis(space),
      space.at(500, 700, -10),
      'should have matching bottom right corner'
    )

    t.end()
  })
}
