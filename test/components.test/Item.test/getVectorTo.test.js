const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:getVectorTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(20, 20)
    space.addChild(item)
    item.translateBy({ x: 30, y: 40 })

    t.deepEqual(
      item.getVectorTo(item.atTopRight()).transitRaw(space),
      { x: 20, y: 0, z: 0 },
      'vector to corner'
    )

    t.deepEqual(
      item.getVectorTo(space).transitRaw(space),
      { x: -30, y: -40, z: 0 },
      'vector to anchor'
    )

    t.end()
  })
}
