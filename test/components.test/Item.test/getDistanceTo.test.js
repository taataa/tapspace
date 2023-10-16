const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:getDistanceTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(20, 20)
    space.addChild(item)
    item.translateBy({ x: 30, y: 40 })

    t.equal(
      item.getDistanceTo(item.atTopRight()).transitRaw(space),
      20,
      'distance to point'
    )

    t.equal(
      item.getDistanceTo(space).transitRaw(space),
      50,
      'distance to anchor'
    )

    t.end()
  })
}
