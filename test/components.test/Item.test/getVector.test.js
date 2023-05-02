const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:getVector', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    space.addChild(item)
    item.translateBy({ x: 10, y: 6 })

    t.deepEqual(
      item.getVector(1, 2).transitRaw(space),
      { x: 1, y: 2, z: 0 },
      'translation should not affect'
    )

    t.deepEqual(
      item.getVector(1, 2, 3).transitRaw(space),
      { x: 1, y: 2, z: 3 },
      'allow z coordinate'
    )

    t.end()
  })
}
