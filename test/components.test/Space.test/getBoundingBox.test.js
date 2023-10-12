const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Plane:getBoundingBox', (t) => {
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

    // Take a direction
    const bounds = space.getBoundingBox()

    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 600, h: 400, d: 20 },
      'should have correct size'
    )

    t.end()
  })
}
