const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('BasisComponent:setParent', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(100, 50))
    const backyard = tapspace.createSpace()
    view.addChild(backyard, view.at(200, 100))

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)

    t.equal(item.getParent(), null, 'should have no parent')

    // Set parent without position
    item.setParent(space)

    t.deepEqual(
      item.at(0, 0).transitRaw(view),
      { x: 100, y: 50, z: 0 },
      'should be at default position'
    )

    t.equal(item.getParent(), space, 'should have parent')

    // Replace parent with position.
    item.setParent(backyard, backyard.at(200, 100))

    t.equal(item.getParent(), backyard, 'should have correct parent')

    t.deepEqual(
      item.at(0, 0).transitRaw(view),
      { x: 400, y: 200, z: 0 },
      'should have correct position'
    )

    // Replace parent without position
    item.setParent(space)
    t.equal(item.getParent(), space, 'should have space parent')
    t.deepEqual(
      item.at(0, 0).transitRaw(space),
      { x: 200, y: 100, z: 0 },
      'should preserve local position'
    )

    t.throws(() => {
      item.setParent(null)
    }, 'should detect non-existing parent')

    t.end()
  })
}
