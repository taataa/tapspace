const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Component:replaceParent', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(100, 50))
    const backyard = tapspace.createSpace()
    view.addChild(backyard, view.at(200, 100))

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)
    space.addChild(item, space.at(300, 150))

    // Store a point
    const before = item.atCenter().transitRaw(view)

    // Reparent
    item.replaceParent(backyard)

    // Sample the point again
    const after = item.atCenter().transitRaw(view)

    t.notEqual(item.getParent(), space, 'should have new parent')

    t.deepEqual(
      after,
      before,
      'points should match'
    )

    t.end()
  })
}
