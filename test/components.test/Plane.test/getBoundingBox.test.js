const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Plane:getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const plane = view.createPlane()

    // Create items for boundary
    const foo = tapspace.createItem('<p>Foo</p>')
    foo.setSize(200, 200)
    foo.setAnchor(0, 0)
    const bar = tapspace.createItem('<p>Bar</p>')
    bar.setSize(200, 200)
    bar.setAnchor(0, 0)

    // Try to add off the plane
    plane.addChild(foo, plane.at(100, 100, 10))
    plane.addChild(bar, plane.at(500, 300, -10))

    // Take a direction
    const bounds = plane.getBoundingBox()

    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 600, h: 400, d: 0 },
      'should be flat'
    )

    t.end()
  })
}
