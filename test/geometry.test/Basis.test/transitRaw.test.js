const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:transitRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))

    const basis = item.getBasis()

    t.deepEqual(
      basis.transitRaw(item),
      { a: 1, b: 0, x: 0, y: 0, z: 0 },
      'should be default'
    )

    t.deepEqual(
      basis.transitRaw(space),
      { a: 1, b: 0, x: 10, y: 10, z: 0 },
      'should be in space'
    )

    t.end()
  })
}
