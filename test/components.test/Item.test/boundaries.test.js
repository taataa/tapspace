const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item :getBoundingBox :getBoundingCircle', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    space.addChild(item)
    item.setSize(100, 100)
    item.translateBy({ x: 10, y: 6 })

    const bbox = item.getBoundingBox()

    t.equal(
      bbox.basis,
      item,
      'should have correct basis'
    )

    t.deepEqual(
      bbox.transitRaw(space),
      { a: 1, b: 0, x: 10, y: 6, z: 0, w: 100, h: 100, d: 0 },
      'should have correct props'
    )

    const bsphere = item.getBoundingCircle()

    t.equal(
      bsphere.basis,
      item,
      'should have correct basis'
    )

    t.deepEqual(
      bsphere.transitRaw(space),
      { x: 60, y: 56, z: 0, r: Math.sqrt(50 * 50 * 2) },
      'should have correct radius'
    )

    t.end()
  })
}
