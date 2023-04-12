const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('BasisComponent:replaceChild', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space, view.at(100, 50))

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)
    space.addChild(item, space.at(300, 150))

    // Create the replacement, note we try different size.
    const rival = tapspace.createItem('<h1>World</h1>')
    rival.setSize(600, 300)

    // Sample a coordinate.
    const before = item.at(0, 0).transitRaw(view)

    // Replace
    space.replaceChild(item, rival)

    // Sample the same coordinate again
    const after = rival.at(0, 0).transitRaw(view)

    t.equal(item.getParent(), null, 'should not have parent')
    t.equal(rival.getParent(), space, 'should have parent')

    t.deepEqual(
      after,
      before,
      'samples should match'
    )

    // Ensure item size was not carried to the rival.
    t.deepEqual(
      rival.atBottomRight().transitRaw(view),
      { x: 1000, y: 500, z: 0 },
      'should have correctly size-offset corner'
    )

    t.end()
  })
}
